import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import "dotenv/config";
import { IUserLogin } from "../../interfaces/login.interfaces";
import { AppError } from "../../errors";
var data = require("../../../fakeData");

export const loginService = async ({ name, password }: IUserLogin) => {
  var userFound = data.find((user) => user.name === name);

  if (!userFound) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const passwordMatch = await compare(password, userFound.password);

  if (!passwordMatch) {
    throw new AppError("User or password is invalid", 403);
  }

  const token = jwt.sign(
    {
      id: userFound.id,
    },
    process.env.SECRET_KEY!,
    {
      subject: String(userFound.id),
      expiresIn: "24h",
    }
  );

  return { token, userFound };
};
