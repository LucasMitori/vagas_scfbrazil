import { AppError } from "./src/errors";
import { Request, Response, NextFunction } from "express";

var data = require("./fakeData");

const getUser = (req: Request, res: Response, next: NextFunction) => {
  //Se for pesquisar pelo parametro na url teria que ser feito a pesquisa por:
  // /user?name=João Oliveira ai manteria req.query.name
  // Troquei para Id porque acredito trazer maior segurança e precisão quando procurado o usuário no banco de dados.

  let id = req.query.id;

  let userFound = data.find((user) => user.id == id);

  if (userFound) {
    userFound.readCount = userFound.readCount ? userFound.readCount + 1 : 1;

    return res.status(200).json(userFound);
  } else {
    throw new AppError("Usuário não encontrado", 404);
  }
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return res.json(data);
};

module.exports = {
  getUser,
  getUsers,
};
