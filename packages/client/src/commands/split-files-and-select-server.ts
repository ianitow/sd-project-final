

import fs from "node:fs";
import path from "node:path";
import splitFile from "split-file";
import { RPCRequest } from '../rpc.js';
import { MAX_FILE_SIZE, __dirname } from "../utils.js";


export const splitFilesAndSelectServers = async (image: string) => {
  const fullPath = path.join(__dirname, '..', "storage")
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);


  const splitedFiles = await splitFile.splitFileBySize(path.join(__dirname, '..', image), MAX_FILE_SIZE, fullPath)
  const servers = await RPCRequest.servers.selectServer.query(splitedFiles.length)
  return [splitedFiles, servers, image]



}
