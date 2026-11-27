import bodyParser from "body-parser";

module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(bodyParser.json()); // middleware que interpreta o body das requisições. converte JSON em um objeto comum
    app.use(app.auth.initialize()); // executa a função initialize() --> ela existe no arquivo auth // inicializa o passport para implementar autenticação na API
    app.use((req, res, next) => { // serve para remover o id enviado pelo cliente. o id é gerado automaticamente em models/user.js
        if (req.body) {
            delete req.body.id;
        }
        next();
    });
};


/*
app.use((req, res, next) => {
    if (req.body) {
        delete req.body.id;
    }
    next();
});


Esse trecho cria um middleware personalizado.

Primeiro, vamos entender o problema que ele procura evitar.

Imagine que você tenha uma rota responsável por cadastrar usuários:
app.post("/users", (req, res) => {
    Users.create(req.body);
});


Agora imagine que alguém envie pelo Postman:
{
    "id": 999,
    "name": "André",
    "email": "andre@email.com"
}


O problema é que o campo id normalmente é gerado automaticamente pelo banco de dados.

O cliente não deveria decidir qual será o identificador do registro.

É justamente para evitar esse tipo de situação que existe:
if (req.body) {
    delete req.body.id;
}


Vamos por partes:

if (req.body)

Verifica se existe um objeto body na requisição.

delete req.body.id

Remove a propriedade id desse objeto.

next()

Permite que o processamento continue para o próximo middleware ou para a rota correspondente.
Exemplo prático
Imagine que o cliente envie:
req.body = {
    id: 999,
    name: "André",
    email: "andre@email.com"
};


Depois da execução:
req.body = {
    name: "André",
    email: "andre@email.com"
};


O campo id foi removido.

Objetivo principal
 Evitar que o cliente tente definir ou manipular diretamente o identificador de um registro através do corpo da requisição.

Uma observação de segurança: isso é apenas uma proteção pontual. Não substitui validação dos dados nem controle dos campos que o cliente pode modificar. Em uma API 
profissional, é melhor definir explicitamente quais propriedades cada operação aceita.
*/
