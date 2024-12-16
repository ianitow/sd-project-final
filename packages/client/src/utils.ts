import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline";
export const preffix = "[SD-PROJECT] > ";

export const MAX_FILE_SIZE = 1024 * 64
export const __dirname = import.meta.dirname

export function removeDirectory(directoryPath: string) {
  return new Promise((resolve, reject) => {
    fs.rm(directoryPath, { recursive: true, force: true }, (err) => {
      if (err) {
        reject(`Erro ao remover o diretório: ${err.message}`);
        return;
      }
      resolve('Diretório removido com sucesso!');
    });
  });
}

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export const prompt = (query: string) =>
  new Promise<string>((resolve) => input.question(query, resolve));

export const listFilesAndSelect = async () => {
  const file = await prompt('Digite o nome do arquivo: ')

  const files = fs.readdirSync(
    path.join(__dirname, '..'),
  )
  if (!files.includes(file)) {
    console.log('Arquivo nao encontrado')
    return null
  }
  return file
}
