import { Request, Response } from "express";
import { AppError } from "./src/errors";
var data = require("./fakeData");

module.exports = function (req: Request, res: Response) {
  var name = req.query.name;

  var user = data.find((user) => user.name === name);

  if (user) {
    user.readCount = user.readCount ? user.readCount + 1 : 1;

    res.json(`Usuário ${name} foi lido ${user.readCount} vez(es).`);
  } else {
    throw new AppError("Usuário não encontrado", 404);
  }
};
