import amqp from "amqplib";
import express, { Request, response, Response } from "express";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  try {
    let connect = await amqp.connect("amqp://localhost");
    const chanel = await connect.createChannel();
    const data = {
      name: "Guilherme",
      lastName: "Suganame",
    };
    const queue = await chanel.assertQueue("test_queue", { durable: false });
    console.log("queue", queue);
    await chanel.sendToQueue("test_queue", Buffer.from(JSON.stringify(data)));
    // console.log("conectou", chanel);
    res.send("conectou");
  } catch (error) {
    console.error(error);
    res.send("falaha ao conectar");
  }

  //   console.log("connect", connect);
  //   res.send(connect);
  //   amqp.connect("amqp://localhost", (error0: any, connection: any) => {
  //     if (error0) {
  //       console.log("error", error0);
  //     }
  //     console.log("connection", connection);
  //   });
  //   res.send("Tentando conexao");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
