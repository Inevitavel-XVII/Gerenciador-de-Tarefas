import passport from "passport";
import {Strategy} from "passport-jwt";

module.exports=app=>{
    const Users=app.db.model.Users;
    const cfg=app.libs.config;                               // secretOrkey: Configura a chave utilizada para validar a assinatura do token.
    const strategy=new Strategy({secretOrKey:cfg.jwtSecret}, // jwtSecret: chave secreta que serve para encode/decode de tokens.
        (payload, done)=>{ // Essa função é executada pela estratégia depois que o token é extraído e válidado. done: função utilizada para informar o resultado
            Users.findById(payload.id) // é um id de usuário consultado pela função findByid (payload é o pedaço do token que contém as declarações/dados)
            .then(user=>{
                if(user){// done(error, user, info); erro, usuário e informações extras
                    return done(null,{ // null quer dizer que não há erro. 2° parâmetro: objeto que representa o usuário 
                        id:user.id,
                        email:user.email
                    });
                }
                return done(null, false); // (não apresentou erros, mas usuário não foi encontrado)
            })
            .catch(error=>done(error, null)); //(existe um erro, usuário não encontrado)
        }
    );
    // no trecho abaixo você usará a estratégia criada acima.
    passport.use(strategy); // você não criou um nome para a estratégia, então em authenticate() será usado "jwt" 
    return{
        initialize:()=>{
            return passport.initialize(); // middleware do express que inicializa o Passport na aplicação, preparando sua integração com o fluxo de requisições http
        },
        authenticate:()=>{
            return passport.authenticate("jwt",cfg.jwtSession); // "jwt" é o nome padrão usado para identificar a estratégia
        }
    };
};

/*

1) ### Qual é a estrutura de new Strategy? ###

new Strategy(configurações, callback);

1 - Objeto de configurações: determina como a estratégia de autenticação deve funcionar.
2 - Função callback: determina o que fazer quando o Passport recebe um token e precisa verificar a identidade do usuário.

No código acima:

const strategy = new Strategy(
    {
        secretOrKey: cfg.jwtSecret
    },
    (payload, done) => {
        // lógica de autenticação
    }
);

Primeiro parâmetro: objeto de configuração.

{
    secretOrKey: cfg.jwtSecret
}

Ele não é um middleware. Ele é um conjunto de configurações que a estratégia passaport-jwt precisa para validar o JWT.

A propriedade: secretOrKey: cfg.jwtSecret

Informa qual a chave secreta deve ser utilizada para verificar a assinatura do token

Imagine que o servidor tenha criado um JWT utilizando determinada chave secreta.
Quando o cliente enviar esse token em uma requisição, o Passport utilizará a chave para verificar se a assinatura é válida.
secretOrKey: informa a chave utilizada para verificar sua assinatura.

### Conclusão ###
Portanto, o primeiro argumento configura a estratégia.

Segundo parâmetro: função callbak.

(payload, done) => {
    Users.findById(payload.id)
}

Essa função é executada pela estratégia depois que o token é extraído e válidado.
Ele recebe dois argumentos:
- payload: informações contidas no corpo do JWT, depois da sua decodificação.
- done: função utilizada para informar ao Passport o resultado da autenticação.

2) ### O que é o payload ###
O JWT possui três partes: "HEADER.PAYLOAD.SIGNATURE"
O payload contém as informações que foram colocadas no token durante a sua criação.
Exemplo: Seu servidor cirou um JWT com estas informações:
{
    id: 15,
    email: "usuario@email.com"
}

Quando o Passport recebe esse token, a estratégia valida sua assinatura e decodifica seu conteúdo.
Então:
(payload, done) => {
    console.log(payload.id);
}

payload.id = 15

Atenção: a chave secreta não é utilizada para decodificar o payload. Ela é utilizada para verificar a assinatura do token. Em JWTs assinados com HMAC, como HS256, 
essa chave também é usada para gerar a assinatura.

Além disso, o payload não é necessariamente criptografado. Portanto, não devemos colocar senhas ou informações sigilosas nele.

### 3. O que é Users.findById(payload.id)? ###

Faz uma consulta ao banco de dados. Como essa consulta é assícrona, ela retorna uma promise. Quando a consulta do banco de dados termina com sucesso, a Promise entrega 
seu resultado para a função passada ao then(). Nesse caso, o resultado é recebido pelo parâmetro user.

### Exemplo ###

Foi encontrado no banco o registro abaixo:
{
    id: 15,
    name: "André",
    email: "usuario@email.com"
}

Então, conceitualmente, seria como executar:
user = {
    id: 15,
    name: "André",
    email: "usuario@email.com"
};

Se não encontrar nenhum usuário, user será null (considerando o comportamento esperado pelo método utilizado).

4) ### O que é o Done? ###
Done é uma função fornecida pelo Passport-JWT. Sua finalidade é comunicar ao Passport o resultado da verificação da identidade
Sua sintaxe: done(error, user, info);
Argumento            Siginificado
error                 Erro ocorrido durante o processo
user                  Usuário autenticado
info                  Informações extras sobre o resultado

No seu código, encontramos três situações.

Situação 1: usuário encontrado
if(user){
    return done(null,{
        id:user.id,
        email:user.email
    });
}


O primeiro argumento é null porque não ocorreu erro.

O segundo argumento é o objeto que representa o usuário autenticado.

Veja que o código não retorna o registro inteiro do banco. Ele seleciona apenas:
{
    id: user.id,
    email: user.email
}


Isso permite disponibilizar ao restante da aplicação somente os dados necessários.

Situação 2: usuário não encontrado
return done(null, false);


Novamente, o primeiro argumento é null, pois não ocorreu um erro técnico.

O segundo é false, indicando que não foi possível autenticar um usuário.

Situação 3: erro na consulta
.catch(error => done(error, null));


Se acontecer algum erro durante a consulta ao banco, ele será encaminhado ao Passport.

Aqui temos:
- error: contém o erro ocorrido.
- null: não existe um usuário autenticado.
Perceba que done é uma forma de devolver o resultado da autenticação ao Passport.

5) ### Como funciona passport.use(strategy)? ###
Agora vamos entender o trecho final:
passport.use(strategy);


Esse comando registra a estratégia de autenticação que você acabou de construir.

Imagine que você tenha criado a seguinte estratégia:
const strategy = new Strategy(...);


Até esse momento, você apenas construiu a estratégia.

Com:
passport.use(strategy);


você informa ao Passport que ele deve utilizar essa estratégia.

Como você não especificou um nome, o Passport-JWT utiliza o nome padrão:
jwt


Isso será importante na próxima parte.
6) ### O que acontece com initialize() e authenticate()? ###
Seu código retorna um objeto:
return {
    initialize: () => {
        return passport.initialize();
    },

    authenticate: () => {
        return passport.authenticate("jwt", cfg.jwtSession);
    }
};


### Vamos por partes.
- initialize()

initialize: () => {
    return passport.initialize();
}


O passport.initialize() é um middleware do Express.

Ele inicializa o Passport na aplicação, preparando sua integração com o fluxo de requisições HTTP.

Normalmente, é registrado assim:
app.use(passport.initialize());


- authenticate()

authenticate: () => {
    return passport.authenticate("jwt", cfg.jwtSession);
}


Aqui temos algo muito interessante.

O método passport.authenticate() recebe o nome da estratégia que deverá ser utilizada.

No seu caso:
passport.authenticate("jwt", cfg.jwtSession);


Isso significa:
1. Receba uma requisição HTTP.
2. Procure o token JWT conforme a configuração da estratégia.
3. Valide a assinatura do token.
4. Execute a callback que você definiu em new Strategy().
5. Consulte o usuário no banco.
6. Verifique o resultado recebido por done.
7. Permita ou negue a autenticação.

O segundo argumento, cfg.jwtSession, contém opções de autenticação. Por exemplo, se estiver definido como { session: false }, informa que a autenticação não deve 
utilizar sessões do Passport.


7) ### Uso do JWT ###

Caso você tivesse criado um nome para a estratégia, então seria da seguinte forma:
passport.use("cachorro",strategy);  
    return{
        initialize:()=>{
            return passport.initialize(); 
        },
        authenticate:()=>{
            return passport.authenticate("cachorro",cfg.jwtSession);
        }
    };
};


.Por que o nome da estratégia é jwt?

Sim! O nome utilizado em "passport.authenticate("jwt", cfg.jwtSession);" é jwt.

Mas existe um detalhe interessante: você não escreveu esse nome explicitamente quando criou a estratégia.

Observe:
const strategy = new Strategy(
    {
        secretOrKey: cfg.jwtSecret
    },
    (payload, done) => {
        // ...
    }
);


Depois:
passport.use(strategy);


O Passport recebe a estratégia e a registra.

Como você não forneceu um nome personalizado, o passport-jwt utiliza o nome padrão jwt.

Ou seja, internamente, é como se você tivesse escrito:
passport.use("jwt", strategy);


Consequentemente, quando você escreve:
passport.authenticate("jwt", cfg.jwtSession);


está dizendo ao Passport:

"Utilize a estratégia registrada com o nome jwt para autenticar esta requisição."



--------------------------------------------------------------------------------------------------------------------------------------------------------------------

*/