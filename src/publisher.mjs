import getNatsConnection from "./nats-client/nats-client.mjs";
import constants from "./constants.mjs";

const { SUBJECT } = constants;

const start = async () => {
  const natsClient = await getNatsConnection();

  if (natsClient.error) {
    console.error(natsClient.message);

    return;
  }

  const { connection } = natsClient;

  const js = connection.jetstream();

  let response = await js.publish(SUBJECT.CREATE, "PavelV");

  console.log(response);
}

start();
