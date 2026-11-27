import express from "express";
import consign from "consign";

const app = express();

consign()
.include("libs/config.js")
.then("db.js")
.then("libs/middlewares.js")
.then("routes")
.then("libs/boot.js")
.into(app);


/*
.then() significa: "Depois de carregar o passo anterior, carregue este próximo arquivo/pasta e adicione-o ao aplicativo na sequência correta"
*/

