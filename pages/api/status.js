function status(req, res) {
  let retorno = { status: "OK", message: "API is running" };
  res.status(200).json({ data: retorno });
}

export default status;
