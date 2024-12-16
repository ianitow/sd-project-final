import { exec } from "node:child_process";
import RabbitMQ from "./Rabbitmq";

const SERVER_ID = process.env.SERVER_ID;


async function handleServerDownEvent(message: any) {
  console.log(
    `[Server Checker] Handling event for server ${SERVER_ID}:`,
    message,
  );

  const restartCommand = `pm2 delete all && cd ../../ && pwd && pm2 start ecosystem-unique.config.js`;
  exec(restartCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(
        `[Server Checker] Error restarting server ${SERVER_ID}:`,
        error,
      );
      return;
    }
    console.log(
      `[Server Checker] Restart successful for server ${SERVER_ID}:\n${stdout}`,
    );
  });
}

async function setupEventQueue() {

  const EXCHANGE_SERVER_EVENTS = "server_events";
  if (!SERVER_ID) {
    throw new Error("SERVER_ID not found");
  }
  const rabbitMQ = RabbitMQ.getInstance();
  await rabbitMQ.connect();
  const channel = rabbitMQ.getChannel();
  await channel.assertExchange(EXCHANGE_SERVER_EVENTS, "direct", { durable: true });
  const queue = await channel.assertQueue(SERVER_ID, { durable: true });
  await channel.bindQueue(queue.queue, EXCHANGE_SERVER_EVENTS, SERVER_ID);

  console.log(`[Server Checker] Waiting for events for server ${SERVER_ID}`);

  channel.consume(queue.queue, (message) => {
    if (message) {
      handleServerDownEvent({});
      channel.ack(message);

    }
  });
}



async function startServerChecker() {
  try {
    setupEventQueue();

  } catch (error) {
    console.error(`[Server Checker] Error:`, error);
  }
}

startServerChecker();

