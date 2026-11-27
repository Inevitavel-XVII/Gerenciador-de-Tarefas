module.exports = (sequelize, DataType) => {

    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: (models) => { // associate é uma função comum com um nome comum, ela apenas executa o código abaixo.
                Tasks.belongsTo(models.Users); // chave estrangeira definida em models/user.js --> esse código abaixo é o mais importante 
            }
        }
    });

    return Tasks;
};

// Abra o arquivo de texto sequelize para entender o código acima
/*

Uma outra forma de escrever o código:

module.exports = (sequelize, DataType) => {

    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Users);
    };

    return Tasks;
};

-------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
*/