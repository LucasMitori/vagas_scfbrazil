var data = require("./fakeData");
import { Request, Response } from "express";
import { AppError } from "./src/errors";

module.exports = function (req: Request, res: Response) {
  var id = req.query.id;

  var userIndex = data.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    data.splice(userIndex, 1);
    return res.status(204).json("Usuário deletado com sucesso.");
  } else {
    throw new AppError("Usuário não deletado", 400);
  }
};
