

import fs from 'node:fs';
import path from 'node:path';
import splitFile from 'split-file';
import { RPCRequest, RPCRequestInternal } from '../rpc.js';
import { __dirname, preffix, removeDirectory } from '../utils.js';

const fullPath = path.join(__dirname, '..', "downloaded")

function writeFileFromBase64(filePath, base64Data) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        reject(`Erro ao escrever o arquivo: ${err.message}`);
        return;
      }
      resolve('Arquivo escrito com sucesso!');
    });
  });
}


export const downloadImageRPC = async (image: string) => {
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);

  const { body } = await RPCRequest.images.getServersByImage.query({ filename: image })

  if (body.length === 0) {
    console.log(`${preffix}Imagem não foi encontrada`)
    return false
  }
  const serversDown = body.filter((server) => server.serverStatus !== 'UP')

  if (serversDown.length > 0) {
    console.log(`${preffix} Não foi possível baixar a imagem`)
    console.log(`${preffix} Servidores fora do ar: \n - ${serversDown.map((server) => server.serverId).join('\n - ')}`)
    return false
  }

  const connectionUrls = body.map((server) => server.connectionUrl)
  console.log(body)
  const downloadFrom = []
  try {
    for (const connectionUrl of connectionUrls) {
      const data = RPCRequestInternal(connectionUrl).images.listAllImagesPartById.query({ id: image })
      downloadFrom.push({ connectionUrl, data })

    }
    await Promise.all(downloadFrom.map((item) => item.data))
  } catch (err) {
    console.log(`${preffix} Erro ao baixar a imagem, tente novamente`)
    return false
  }
  const filesToMerge = []
  for (const { connectionUrl, data } of downloadFrom) {
    const { body } = await data
    for (const item of body) {
      const result = await RPCRequestInternal(connectionUrl).images.downloadImage.query({ id: item })
      writeFileFromBase64(path.join(fullPath, item), result.body)
      filesToMerge.push(path.join(fullPath, item))
    }
  }
  filesToMerge.sort((a, b) => a.localeCompare(b))
  splitFile.mergeFiles(filesToMerge, path.join(fullPath, '..', `downloaded-${image}`)).then(async () => {
    removeDirectory(fullPath)
  })

  return true
}
