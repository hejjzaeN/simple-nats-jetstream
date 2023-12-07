import getNatsConnection from "./nats-client.mjs";
import constants from "../constants.mjs";
import { AckPolicy } from "nats";

const {
  STREAM,
  SUBJECT,
  CONSUMER,
} = constants;

export default async () => {
  try {
    const natsClient = await getNatsConnection();

    if (natsClient.error) {
      console.error(natsClient.message);

      return;
    }

    const { connection } = natsClient;

    const jsm = await connection.jetstreamManager();

    await jsm.streams.add({ name: STREAM.USER, subjects: Object.values(SUBJECT) });

    await jsm.consumers.add(STREAM.USER, {
      durable_name: CONSUMER.FIRST,
      ack_policy: AckPolicy.Explicit,
    });

    const js = connection.jetstream();

    const consumer = await js.consumers.get(STREAM.USER, CONSUMER.FIRST);

    console.log("Consumer created");

    return {
      consumer,
    }
  } catch (err) {
    return {
      error: true,
      message: `NATS JSM failed: ${ err.message }` || "Cannot configure JSM",
    };
  }
};
