import amqplib, { type Channel, type Connection } from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

class RabbitMQ {
  private static instance: RabbitMQ;
  private connection!: Connection;
  private channel!: Channel;

  private constructor() { }

  public static getInstance(): RabbitMQ {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
    }
    return RabbitMQ.instance;
  }

  public async connect(): Promise<void> {
    if (!this.connection || this.connection.closed) {
      console.log("[RabbitMQ] Connecting to RabbitMQ...");
      this.connection = await amqplib.connect(RABBITMQ_URL);
    }

    if (!this.channel || this.channel.closing) {
      console.log("[RabbitMQ] Creating channel...");
      this.channel = await this.connection.createChannel();
    }
  }

  public getChannel(): Channel {
    if (!this.channel) {
      throw new Error(
        "[RabbitMQ] Channel not initialized. Call connect() first.",
      );
    }
    return this.channel;
  }

  public async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    console.log("[RabbitMQ] Connection closed.");
  }
}

export default RabbitMQ;
