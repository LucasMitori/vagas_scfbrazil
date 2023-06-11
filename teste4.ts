var data = require("./fakeData");
import { AppError } from "./src/errors";
import { Response, Request } from "express";

module.exports = function (req: Request, res: Response) {
  var id = req.query.id;

  var user = data.find((user) => user.id === id);

  if (user) {
    user.name = req.body.name;
    user.job = req.body.job;
    user.password = req.body.password;

    res.status(201).json(user);
  } else {
    throw new AppError("Usuário não encontrado", 404);
  }
};
