module.exports={
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        define: {
            underscored: true
        }
    },
    jwtSecret:"Ntask-AP1", // chave secreta que serve para encode/decode de tokens. precisa ser complexa, para melhorar a segurança
    jwtSession:{session:false} // é utilizado para informar ao passport que a autênticação não terá sessão de usuário.
};

// o que é encode e decode?
// o que é sessão de usuário?

