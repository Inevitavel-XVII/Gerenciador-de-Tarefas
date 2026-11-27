
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('ntask.sqlite');

const funcaoUm=()=>{
    db.all(
    "SELECT name, sql FROM sqlite_master WHERE type = 'table'",
    (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log(JSON.stringify(rows, null, 2));
        }

        db.close();
    }
);
}

// funcaoUm();

const funcaoDois=()=>{
    db.all(
    "PRAGMA table_info('Users')",
    (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log(rows);
        }

        db.close();
    }
    );
};

// funcaoDois();



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------


/*

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('ntask.sqlite');
db.all(
    "SELECT name, sql FROM sqlite_master WHERE type = 'table'",
    (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log(JSON.stringify(rows, null, 2));
        }

        db.close();
    }
);
para que serve o código acima?

Esse código serve para consultar a estrutura do banco de dados SQLite, especificamente para listar todas as tabelas existentes no banco ntask.sqlite, mostrando 
também o comando SQL utilizado para criar cada uma delas.

Vamos por partes.
1. Importação do SQLite
const sqlite3 = require('sqlite3');


Importa a biblioteca sqlite3, que permite que o Node.js se comunique com bancos de dados SQLite.
2. Abertura do banco de dados
const db = new sqlite3.Database('ntask.sqlite');


Cria uma conexão com o banco de dados chamado ntask.sqlite.

Um detalhe importante: se esse arquivo não existir, o SQLite poderá criá-lo automaticamente.
3. Consulta ao banco de dados
db.all(
    "SELECT name, sql FROM sqlite_master WHERE type = 'table'",


Aqui está a parte mais interessante!

O método db.all() executa uma consulta SQL e retorna todos os registros encontrados.

Mas o que estamos consultando?

sqlite_master é uma tabela interna do SQLite que armazena informações sobre os objetos existentes no banco de dados, como:
- Tabelas;
- Índices;
- Views;
- Triggers.
A consulta:
SELECT name, sql
FROM sqlite_master
WHERE type = 'table';


Significa:
- SELECT name, sql: queremos obter o nome e o comando SQL de criação dos objetos.
- FROM sqlite_master: vamos consultar o catálogo interno do SQLite.
- WHERE type = 'table': queremos somente os objetos do tipo tabela.
Por exemplo, imagine que seu banco tenha duas tabelas: Tasks e Users.

O resultado poderia ser:
[
  {
    "name": "Tasks",
    "sql": "CREATE TABLE Tasks (...)"
  },
  {
    "name": "Users",
    "sql": "CREATE TABLE Users (...)"
  }
]


4. Callback e tratamento de erros
(err, rows) => {
    if (err) {
        console.error(err);
    } else {
        console.log(JSON.stringify(rows, null, 2));
    }


Essa função é um callback executado quando a consulta termina.

Ela recebe dois argumentos:
- err: contém informações sobre um possível erro.
- rows: contém os registros encontrados pela consulta.
Se ocorrer um erro, ele será exibido no console.

Caso contrário:
console.log(JSON.stringify(rows, null, 2));


Transforma o resultado em uma string JSON formatada.

O null e o 2 servem para deixar o JSON identado e mais fácil de visualizar.
5. Fechamento da conexão
db.close();


Fecha a conexão com o banco de dados após a consulta terminar.

Isso é importante para liberar os recursos utilizados.

Relacionando com seu projeto NTask API
Lembra que estamos trabalhando com Sequelize?

No seu projeto, você utiliza algo semelhante a:
app.db.sync()


O Sequelize utiliza os modelos definidos na aplicação para sincronizar a estrutura do banco de dados.

Por exemplo, seu modelo Tasks define campos como:
- id;
- title;
- done.
O código que você apresentou permite verificar diretamente no SQLite se as tabelas foram criadas e qual SQL foi utilizado para criá-las.

Uma observação importante: esse código não utiliza o Sequelize para consultar os dados. Ele acessa diretamente o SQLite através da biblioteca sqlite3.
Guarde esta diferença:
- Sequelize: ORM que permite trabalhar com o banco utilizando JavaScript e modelos.
- sqlite3: biblioteca que permite executar operações diretamente no SQLite.
- sqlite_master: catálogo interno do SQLite que contém informações sobre a estrutura do banco.

Em resumo: esse código é uma ferramenta de inspeção, utilizada para conferir a estrutura do banco SQLite e verificar se as tabelas esperadas realmente existem.
*/


//----------------------------------------------------------------------------------------------------------------------------------------------------------------
/*

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('ntask.sqlite');

db.all(
    "PRAGMA table_info('Users')",
    (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log(rows);
        }

        db.close();
    }
);


Esse código tem uma finalidade semelhante ao anterior, mas agora ele consulta a estrutura de uma tabela específica do banco de dados SQLite, chamada Users.

Vamos analisar.
1. Conexão com o banco
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('ntask.sqlite');


Importa a biblioteca SQLite e estabelece uma conexão com o banco ntask.sqlite.
2. Consulta à estrutura da tabela
db.all(
    "PRAGMA table_info('Users')",


Aqui está a principal diferença em relação ao código anterior.

PRAGMA é um comando especial do SQLite que permite consultar configurações e informações internas do banco de dados.

Nesse caso:
PRAGMA table_info('Users');


Solicita informações sobre as colunas da tabela Users.

Imagine que sua tabela tenha sido criada assim:
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);


O resultado será semelhante a:
[
    {
        cid: 0,
        name: 'id',
        type: 'INTEGER',
        notnull: 0,
        dflt_value: null,
        pk: 1
    },
    {
        cid: 1,
        name: 'name',
        type: 'VARCHAR(100)',
        notnull: 1,
        dflt_value: null,
        pk: 0
    },
    {
        cid: 2,
        name: 'email',
        type: 'VARCHAR(100)',
        notnull: 0,
        dflt_value: null,
        pk: 0
    }
]


Veja o significado das propriedades:
- Propriedade	                     - Significado

1.cid	                             - Posição da coluna na tabela (começando em 0).
2.name	                             - Nome da coluna.
3.type	                             - Tipo de dado declarado.
4.notnull                            - Indica se a coluna possui restrição NOT NULL (1 = sim).
5.dflt_value	                     - Valor padrão da coluna, caso exista.
6.pk	                             - Indica se a coluna participa da chave primária (1 = sim).

3. Callback e fechamento
(err, rows) => {
    if (err) {
        console.error(err);
    } else {
        console.log(rows);
    }

    db.close();
}


Assim como no código anterior:
- err recebe um possível erro.
- rows recebe as informações das colunas.
- console.log(rows) exibe o resultado.
- db.close() encerra a conexão.

Essa é a diferença fundamental comparando os dois códigos:
Código	                                                              O que consulta?

SELECT name, sql FROM sqlite_master WHERE type = 'table'	          Lista as tabelas do banco e seus comandos de criação.
PRAGMA table_info('Users')	                                          Lista as colunas e suas propriedades de uma tabela específica.


Uma observação para seu aprendizado de Node.js e Sequelize:

Esses dois códigos são úteis para investigar o que o Sequelize está criando no SQLite.

Por exemplo, você pode utilizar o primeiro para verificar se a tabela Users existe e o segundo para conferir se as colunas foram criadas corretamente conforme a 
definição do seu Model.

Ou seja, você está verificando o resultado da sincronização entre os Models do Sequelize e a estrutura física do banco de dados.
*/