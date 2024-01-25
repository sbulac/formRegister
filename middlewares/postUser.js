const postUser = (req, res, next) => {
  const { body } = req;

  if (!body.name.trim() > 0) {
    return res.status(400).send("El campo nombre está vacio");
  }
  if (!body.lastName.trim() > 0) {
    return res.status(400).send("El campo apellido está vacio");
  }
  if (!body.number.trim() > 0) {
    return res.status(400).send("El campo telefono está vacio");
  }
  if (body.number.length !== 10) {
    return res.status(400).send("El telefono debe tener 10 digitos");
  }
  if (body.number[0] !== "3") {
    return res.status(400).send("El telefono debe empezar con 3");
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
    return res.status(400).send("El campo email es invalido");
  }
  const newName = body.name.split(" ", 1)[0];
  const newLastName = body.lastName.split(" ", 1)[0];

  body.name = newName;
  body.lastName = newLastName;
  next();
};

module.exports = postUser;
