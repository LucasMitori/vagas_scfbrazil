var express = require("express");
var bodyParser = require("body-parser");
var app = express();
import { handleError } from "./src/errors";
import { Request, Response } from "express";
import { loginRoutes } from "./src/routes/login.routes";
import { ensureAuthMiddleware } from "./src/middlewares/ensure.authorization.middleware";

var teste1 = require("./teste1");
var teste2 = require("./teste2");
var teste3 = require("./teste3");
var teste4 = require("./teste4");
var teste5 = require("./teste5");

app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req: Request, res: Response) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

//Adicionado middleware de autentificação, precisando primeiro logar com token para poder depois acessar os outros caminhos. O intuito mesmo era criar um usuário master com isAdmin true e esse ser o critério de permissão, mas como não possui só coloquei para mostrar meus conhecimentos com middleware.

app.get("/user", teste1.getUser);
app.get("/users", teste1.getUsers);
app.post("/users", teste2);
app.delete("/users", ensureAuthMiddleware, teste3);
app.put("/users", ensureAuthMiddleware, teste4);
app.get("/users/access", teste5);

//Criado caminho apenas como um exemplo de Login de usuário, com caminhos certos de routes, controllers e services.

app.use("/login", loginRoutes);

//Adicionado função criada para mostrar um Erro na tela, sendo chamado aqui para ser usado no projeto inteiro.

app.use(handleError);

const port = 3000;
app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
