module.exports = (sequelize, DataType) => {

    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true, 
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, { 
        hooks:{ // hook específico do sequelize
            beforeCreate: user=>{ //executa o hook antes de inserir um novo registro 
                const salt=bcrypt.genSaltSync(); // bcrypt.genSaltSync() gera um valor aleatório e associa a const salt
                user.password=bcrypt.hashSync(user.password,salt); // ele cria um hash e vai armazená-lo no banco de dados no lugar da senha.
            }
        },
        classMethods: {
            associate: (models) => { 
                Users.hasMany(models.Tasks); 
            }
        },
        isPassword:(encodedPassword, password) =>{ // (hash da senha armazenada no banco, senha original digitada pelo usuário)
            return bcrypt.compareSync(password, encodedPassword); // bcrypt.compareSync() compara a senha digitada pelo usuário com  hash armazenado no banco
        }
    });

    return Users;
};
/*Uma observação importante: o bcrypt não descriptografa o hash. Ele verifica se a senha informada corresponde ao hash armazenado.*/
