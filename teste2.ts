var data = require("./fakeData");
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { IUserResponse } from "./src/interfaces/users.interfaces";
import bcrypt from "bcryptjs";
import { userWithoutPasswordSchema } from "./src/schemas/user.schemas";

module.exports = async (req: Request, res: Response) => {
  var name = req.body.name;
  var job = req.body.job;
  let password = req.body.password;

  var hashedPassword = bcrypt.hashSync(password, 10);

  var newUser: IUserResponse = {
    id: uuidv4(),
    name: name,
    job: job,
    password: hashedPassword,
  };

  const userWithoutPassword = await userWithoutPasswordSchema.validate(
    newUser,
    {
      stripUnknown: true,
    }
  );

  data.push(newUser);

  res.status(201).json(userWithoutPassword);
};
