const getOneUser = (req, res, next) => {
  const { body, params } = req;

  let tempId = parseInt(params.id);

  if (tempId < 1) {
    return res.status(400).send("No hay usuarios con ese id");
  }
  next()
};

module.exports = getOneUser;
