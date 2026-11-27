module.exports=app=>{
  app.listen(app.get("port"),()=>{
    console.log(`NTask API - porta ${app.get("port")}`);
  });
}
// A pasta libs/boots.json será responsável por iniciar o servidor através da função app.listen() na porta 300 e exibe uma mensagem