import database from "../../../../infra/database.js";

async function status(req, res) {
  let retorno = {
    status: "OK",
    message: "API is running",
  };
  const result = await database.query("SELECT 1+1 as Soma;");
  console.log(result.rows);
  res.status(200).json({ lastUpdate: new Date().toISOString(), data: retorno });
}

export default status;
