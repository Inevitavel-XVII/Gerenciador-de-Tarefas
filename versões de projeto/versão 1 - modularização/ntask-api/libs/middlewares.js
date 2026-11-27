module.exports=app=>{
    app.set("port", 3000);
    app.set("json spaces", 4); // faz com que o resultados retornem um JSON formatado
};

// A pasta libs/middlewares.js será responsável por carregar toda a lógica dos middlewares e configurações específicas do express.
// A pasta libs/boots.json será responsável por iniciar o servidor através da função app.listen().