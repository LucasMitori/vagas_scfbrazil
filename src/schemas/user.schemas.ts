import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserResponse } from "../interfaces/users.interfaces";

const userWithoutPasswordSchema: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(),
  job: yup.string().required(),
  password: yup.string().required(),
});

export { userWithoutPasswordSchema };
