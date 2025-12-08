import { Client } from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    var result = await client.query(queryObject);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.end();
  }
  return result;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSslConfig(),
  });
  await client.connect();
  return client;
}

function getSslConfig() {
  return process.env.NODE_ENV === "production" ? true : false;
}

export default {
  query,
  getNewClient,
};
