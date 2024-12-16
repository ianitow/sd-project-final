

import fs from 'node:fs';
import path from 'node:path';
import { RPCRequest, RPCRequestInternal } from '../rpc.js';
import { __dirname, preffix } from '../utils.js';
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


export const deleteImageRPC = async (image: string) => {
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);

  const { body, ...rest } = await RPCRequest.images.getServersByImage.query({ filename: image })
  console.log('body', image)
  if (body.length === 0) {
    console.log(`${preffix}Imagem não foi encontrada`)
    return false
  }
  const serversDown = body.filter((server) => server.serverStatus !== 'UP')

  if (serversDown.length > 0) {
    console.log(`${preffix} Não foi possível deletar a imagem`)
    console.log(`${preffix} Servidores fora do ar: \n - ${serversDown.map((server) => server.serverId).join('\n - ')}`)
    return false
  }

  const connectionUrls = body.map((server) => server.connectionUrl)

  const deleteFrom = []
  try {
    for (const connectionUrl of connectionUrls) {
      const data = RPCRequestInternal(connectionUrl).images.deleteImage.mutate({ filename: image })
      deleteFrom.push({ connectionUrl, data })

    }
    await Promise.all(deleteFrom.map((item) => item.data))
    await RPCRequest.images.unregisterImage.mutate({ filename: image })
    console.log(`${preffix} Imagem deletada com sucesso!`)
  } catch (err) {
    console.log(`${preffix} Erro ao deletar a imagem, tente novamente`)
    return false
  }


  return true
}
