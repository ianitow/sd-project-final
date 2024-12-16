

import fs from 'node:fs';
import path from 'node:path';
import { RPCRequest, RPCRequestInternal } from '../rpc.js';
import { __dirname, preffix, removeDirectory } from '../utils.js';
import { splitFilesAndSelectServers } from './split-files-and-select-server.js';
const fullPath = path.join(__dirname, '..', "storage")
function convertFileToBase64(filepath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(new Error(`Erro ao ler o arquivo: ${err.message}`));
        return;
      }
      // Converter o conteúdo do arquivo para base64
      const base64Data = data.toString('base64');
      resolve(base64Data);
    });
  });
}

async function checkIfAlreadyExists(filename: string) {

  const { body } = await RPCRequest.images.getServersByImage.query({ filename })

  return body.length > 0

}


export const sendImageRPC = async (image: string) => {
  const exists = await checkIfAlreadyExists(image)
  if (exists) {
    console.log(`${preffix}Imagem já cadastrada, escolha outro nome`)
    return false
  }


  const [splittedFiles, { body }, originalName] = await splitFilesAndSelectServers(image)
  const servers = body
  if (!servers || servers.length === 0) {
    console.log("Sem servidores o suficiente")
    return false
  }
  const allBase64Data: { filename: string, data: string }[] = await Promise.all(splittedFiles.map(async (item: string) => {
    return {
      filename: item.split('storage/')[1],
      data: await convertFileToBase64(item)
    }
  }))
  const result = []
  for (let i = 0; i < servers.length; i++) {

    const { filename, data } = allBase64Data[i]
    result.push(await RPCRequestInternal(servers[i].connectionUrl).images.uploadImage.mutate({ id: filename, data }))
  }
  try {
    await Promise.all(result)
    const allServers = new Set<string>(servers.map((server) => server.serverId))
    const r = await RPCRequest.images.registerImage.mutate({ filename: originalName, servers: [...allServers.values()] })
    removeDirectory(fullPath)
    return r
  } catch (err) {

    const r = await RPCRequest.images.unregisterImage.mutate({ filename: originalName })
    return false
  }
}
