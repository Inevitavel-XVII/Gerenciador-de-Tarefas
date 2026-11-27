import express from "express";
import consign from "consign";

const app = express(); 

consign() // inicializa o consign
.include("models") // Indica a pasta que contém os módulos que devem ser carregados.
.then("libs/middlewares.js") // Depois de carregar o passo anterior, carregue este próximo arquivo/pasta e adicione-o ao aplicativo na sequência correta
.then("routes") // Depois de carregar o passo anterior, carregue este próximo arquivo/pasta e adicione-o ao aplicativo na sequência correta
.then("libs/boot.js") // Depois de carregar o passo anterior, carregue este próximo arquivo/pasta e adicione-o ao aplicativo na sequência correta
.into(app); // Integra os módulos carregados à aplicação Express.

/*
Esse projeto está usando, até o momento, express, consign e o compilador babel.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
EXPRESS: ele é um framework minimalista que permite você traalhar com view, routes, middlewares própios ou de terceiros. Dá liberdade a você usar uma biblioteca de
persistência e um banco de dados SQL ou NoSQL

View:
- Apresenta informações ao usuário, geralmente em HTML.
Router:
- Associa métodos HTTP e caminhos às funções responsáveis por atendê-los.
Controllers:
- Processa a requisição e coordena a resposta.
Model:
- Representa os dados e pode disponibilizar operações para manipulá-los.
Persistência:
- Armazenamento duradouro de dados.
Framework / biblioteca de persistência:
- Facilita o acesso e a manipulação dos dados armazenados.

CARACTERÍSTICAS DO DO EXPRESS:
- routing robusto --> sistema que decide qual código será executado de acordo com a requisição.
- facilmente integrado com os principais templates engines --> páginas html dinâmicas criadas no lado servidor. 
- conceito de middlewares ---> função que processa a requisição http.
- Possui uma grande lista de middlewares 3rdd-party ---> serviços externos, serviços de terceiros, que processam uma requisição http.
- Content negotiation ---> define qual o tipo de dado que está na requisição ou no response. Por exemplo: Content-Type: application/json.
- Adota padrões e boas práticas de serviços REST. ----> padronização de como as api serão orgazinadas.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
CONSIGN: ele serve para carregar automaticamente script da sua aplicação, sem a necessidade de usar require. Fica mais "bonito" e fácil de organizar.

Organizando o carregamento dos módulos.

Será usado o padrão MVR(Model-View-Router) para organizar a aplicação de forma simplificada. Ela evita a necessidade de ter todos os endpoints em um único arquivo.
O módulo consign permite carregar e injetar dependências de forma bem simples. Aparentemente, a biblioteca consign parece ser mais do mesmo pois o javascript já possui
um sistema de módulos. Entretanto, a biblioteca consign oferece uma camada de automação e facilitando a escrita do código. 

consign()                ---->	     Inicializa o Consign.
.include("routers")	     ---->       Indica a pasta que contém os módulos que devem ser carregados.
.into(app)	                         Integra os módulos carregados à aplicação Express.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

###Se a api crescer e tenha 30 arquivos de rotas, você vai precisar fazer o seguinte:

import usuarios from "./routers/usuarios.js";
import tarefas from "./routers/tarefas.js";
import projetos from "./routers/projetos.js";
import comentarios from "./routers/comentarios.js";
import autenticacao from "./routers/autenticacao.js";

usuarios(app);
tarefas(app);
projetos(app);
comentarios(app);
autenticacao(app);

###Com consign, você faria:

const express = require('express');
const consign = require('consign');

const app = express();

consign({ verbose: false })
  .include('db.js')
  .then('models')
  .then('associations.js')
  .then('auth.js')
  .then('middlewares.js')
  .then('routes')
  .then('boot.js')
  .into(app);

module.exports = app;
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
babel: compilador javascript que permite transformar o código moderno em uma versão mais antiga.

Na versão do livro o node não tem 100% de suporte ao ES6, então é usado um módulo que emula recursos interessantes. E é usado o Babel, que é um Transpiler.
O que é um transpiler?
Ele converte um código de javascript moderno para um código de versões antigas que possam ser lidos ler, por exemplo:

### JS Moderno ###
const somar = (a, b) => a + b;

### JS Antigo ###
var somar = function(a, b) {
    return a + b;
};


Execute o comando quando você for instalar o babel

npm install  babel --save
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


/*
PRIMEIRA VERSÃO DESSE CÓDIGO:

import express from "express";
const PORT = 3000;
const app = express();

app.set("json spaces", 4); // faz com que o resultados retornem um JSON formatado

app.get("/", (req,res) => res.json({status: "NTask API"}));

app.get("/tasks",(req,res)=>{
    res.json({
        task:[
            {title: "Fazer compras"},
            {title: "Consertar o pc"},
        ]
    });
});

app.listen(PORT, ()=> console.log(`NTask API - porta ${PORT}`));
*/