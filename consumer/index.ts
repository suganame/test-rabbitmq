import amqplib from "amqplib/callback_api";

// import * as Amqp from "amqp-ts";

// const connection = new Amqp.Connection("amqp://localhost");
// const queue = connection.declareQueue("test_queue", { durable: false });

// connection.on("open_connection", () => {
//   queue.activateConsumer((message) => {
//     console.log(message.getContent().toString());
//   });
// });

const queue = "test_queue";

try {
  amqplib.connect("amqp://localhost", (err: any, conn: any) => {
    if (err) throw err;

    conn.createChannel((err: any, channel: any) => {
      if (err) throw err;

      channel.assertQueue(queue, { durable: false });

      channel.consume(queue, (message: any) => {
        if (message !== null) {
          console.log(message.content.toString());
          channel.ack(message);
          //   channel.ack(message);
        } else {
          console.log("consumer canceller by server");
        }
      });
    });
  });
} catch (error) {
  console.error(error);
}
