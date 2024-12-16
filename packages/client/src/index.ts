import { deleteImageRPC } from "./commands/delete-image.js";
import { downloadImageRPC } from "./commands/download-image.js";
import { listAllImagesRPC } from "./commands/list-all-images.js";
import { listAllServersRPC } from "./commands/list-all-servers.js";
import { sendImageRPC } from "./commands/send-image.js";
import { listFilesAndSelect, prompt } from "./utils.js";




async function main() {
  while (true) {
    console.log("----------------MENU---------------------");
    console.log("1. Enviar imagem");
    console.log("2. Listar imagens do servidor");
    console.log("3. Baixar imagem");
    console.log("4. Deletar imagem");
    console.log("5. Listar servidores disponíveis");
    console.log("6. Sair");
    const option = await prompt("Opção: ");
    switch (option) {
      case "1":
        {
          const file = await listFilesAndSelect()
          if (file) {
            console.time('ExecutionTime');

            const result = await sendImageRPC(file)
            console.timeEnd('ExecutionTime');

          }
          await prompt("Pressione enter para continuar\n");

        }
        break;
      case "2":
        {
          console.log(await listAllImagesRPC())
          await prompt("Pressione enter para continuar\n");
          break;
        }
      case "3":
        {
          const file = await prompt("Digite o nome da imagem: ")
          if (file) {
            console.time('ExecutionTimeDownload');
            await downloadImageRPC(file)
            console.timeEnd('ExecutionTimeDownload');
          }
          await prompt("Pressione enter para continuar\n");
          break;
        }
      case "4":
        {
          console.log(await listAllImagesRPC())
          const option = await prompt("Selecione a imagem: ");
          if (option) {
            await deleteImageRPC(option)
          }

          await prompt("Pressione enter para continuar\n");
          break;
        }
      case "5":
        {
          await listAllServersRPC()
          break;
        }
      case "6":
        {
          return process.exit();
        }
      default:
        console.log("Opção inválida");
        break;
    }
  }
}

main();


