import { max } from "pg/lib/defaults";
import database from "/infra/database.js";

async function status(req, res) {
  const databaseInfo = await getStatusDatabase();

  let retorno = {
    status: "OK",
    message: "API is running",
  };

  const updateAt = new Date().toISOString();
  res.status(200).json({
    update_at: updateAt,
    dependencies: databaseInfo,
  });
}

async function getStatusDatabase() {
  const databaseVersionResult = await database.query("SHOW server_version");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseCurrentConnectionsResult = await database.query({
    text: "SELECT COUNT(1)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const databaseCurrentConnectionsValue =
    databaseCurrentConnectionsResult.rows[0].count;

  var retorno = {
    database: {
      version: databaseVersionValue,
      max_connections: parseInt(databaseMaxConnectionsValue),
      opened_connections: databaseCurrentConnectionsValue,
    },
  };
  return retorno;
}

export default status;
