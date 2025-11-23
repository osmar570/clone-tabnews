function status(req, res) {
  let retorno = {
    status: "OK",
    message: "API is running",
  };
  res.status(200).json({ lastUpdate: new Date().toISOString(), data: retorno });
}

export default status;
