import jsmManager from "./nats-client/jsm-manager.mjs";

const start = async function start () {
  try {
    const jsm = await jsmManager();

    if (jsm.error) {
      console.error(jsm.message);

      return;
    }

    const { consumer } = jsm;

    const messages = await consumer.consume();

    for await (const msg of messages) {
      console.log(`Message: ${ msg.data }`);
      msg.ack();
    }
  } catch (err) {
    console.error(`Subsription error: ${ err.message }` || "Unexpected subsription error");
  } finally {
    setTimeout(start, 3000);
  }
}

start();
