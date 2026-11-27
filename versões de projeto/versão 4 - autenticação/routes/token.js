import jwt from "jwt-simple";

module.exports=app=>{
    const cfg=app.libs.config;
    const Users=app.db.models.Users;
    app.post("/token", (req, res)=>{
        if(req.body.email && req.body.password) {
            const email=req.body.email;
            const password=req.body.password;
            Users.findOne({where:{email:email}}) // verifica o usuário no banco
            .then(users=>{
                if(Users.isPassword(users.password, password)){ // verifica a senha
                    const payload={id:users.id};
                    res.json({
                        token: jwt.encode(payload, cfg.jwtSecret) // gerando o token
                    });
                } else{
                    res.sendStatus(401); // Ele trata o caso em que o usuário existe, mas informou uma senha incorreta.
                }
            })
            .catch(error=>res.sendStatus(401)); // tratar erros ocorridos durante a consulta ou execução da Promise.
        }else{
            res.sendStatus(401);
            // impede que a aplicação tente autenticar uma requisição sem email ou senha. Nesse caso, porém, 400 Bad Request seria mais apropriado, pois faltam dados obrigatórios.
        }
    });
}


/*
O que é Secret ou Secret Key?
Lembra quando você perguntou se secretOrKey era a estratégia de autenticação?

Agora podemos esclarecer melhor.

Imagine que sua API gera um JWT utilizando uma chave secreta.

Essa chave é utilizada pelo servidor para assinar o token.

Quando o cliente apresenta o token novamente, o servidor utiliza a chave correspondente para verificar sua assinatura.

Exemplo conceitual:
const token = jwt.encode(
    { id: user.id },
    'minha-chave-secreta'
);


Nesse exemplo:
- { id: user.id } representa os dados que serão colocados no Payload.
- 'minha-chave-secreta' é a chave utilizada na assinatura.
- jwt.encode() gera o token.
Em uma aplicação real, a chave deve ficar em uma variável de ambiente, não diretamente no código.

Atenção: a chave secreta não é o token. São coisas diferentes.
*/