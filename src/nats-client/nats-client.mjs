import { connect } from "nats";

export default async () => {
  try {
    const connection = await connect({
      servers: "localhost",
      token: "pavelv", // pass through env
    });

    if (!connection) {
      throw new Error();
    }

    console.log(`Nats connected to ${ connection.getServer() }`);

    return { connection };
  } catch (err) {
    return {
      error: true,
      message: `NATS connection failed: ${ err.message }` || "Cannot connect to NATS server",
    };
  }
};
