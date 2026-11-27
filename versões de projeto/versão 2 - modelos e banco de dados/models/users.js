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
            unique: true, // evita que cadastrem emails repetidos
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => { // associate é uma função comum com um nome comum, ela apenas executa o código abaixo.
                Users.hasMany(models.Tasks); // --> esse código abaixo é o mais importante
            }
        }
    });

    return Users;
};

/*
Guarde esta regra mental:

Quando temos um relacionamento de um para muitos (1:N), normalmente a chave estrangeira fica no lado N, ou seja, na tabela que possui vários registros.

Você acabou de aplicar corretamente um dos conceitos mais importantes dos bancos de dados relacionais!
*/