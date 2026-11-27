import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
let db = null;

module.exports=app=>{
    if(!db){
        const config = app.libs.config;
        // é associado todo o arquivo config a const config
        const sequelize=new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
        // você cria uma classe e usa o config com suas propriedades, herdadas do arquivo config
        db={ 
            sequelize, 
            Sequelize, // classe Sequelize importada da biblioteca
            models:{} 
        };
        // - db: Objeto centralizador das informações e recursos relacionados ao banco de dados
        // - sequelize: Instancia, da classe Sequelize, responsável por gerenciar a comunicação com o banco de dados. Essa instância está guardada dentro do db 
        // para que outras partes da aplicação possam utilizá-la.
        // - Sequelize: classe Sequelize importada da biblioteca
        // - models: Objeto que armazenará os modelos que representam as tabelas do banco de dados.
        // Após os modelos serem carregados, haverá algo da seguinte forma:
        /*
        db.models = {
            Tasks: modeloTasks,
            Users: modeloUsers
        };
        */
        const dir=path.join(__dirname, "models");
        // construir o caminho até a pasta informada, no caso "models"
        // __dirname: caminho absoluto do diretório
        // models: destino final
        // resultado: C:\projeto\ntask-api\libs\models. 
        fs.readdirSync(dir).forEach(file=>{
            const modelDir = path.join(dir,file); 
            const model = sequelize.import(modelDir);
            db.models[model.name]=model;
        });
        // fs.readdirSync(dir) --> retorna um array de strings com o nome de pasta e arquivos que existe em dir(models) --> ["task.js", "user.js"]
        // forEach() --> percorre o array de readdirSync() --> cada file é uma string do array criado por readdirSync()
        // const modelDir = path.join(dir,file); --> pega o caminho dir e os arquivos existentes em models
        // dir = "C:\\projeto\\ntask-api\\models";
        // file = "task.js";
        // resultado: modelDir é igual a => C:\projeto\ntask-api\models\task.js
        // const model = sequelize.import(modelDir); =>   A intenção desse código é carregar o arquivo do modelo e registrá-lo no Sequelize
        // db.models[model.name]=model; => esse trecho do código armazena o modelo dentro do objeto db.models

        // por favor, me explique sobre esse trecho de código
        Object.keys(db.models).forEach(key=>{ 
            db.models[key].associate(db.models);
        });
        // Object.keys(db.models) => ["Tasks", "Users"] --->método nativo do JavaScript que retorna um array contendo as propriedades enumeráveis de um objeto.
        // forEach() =>{
        //     db.models["Tasks"].associate(db.models); --> executa: Tasks.belongsTo(db.models.Users); --. esse trecho está dentro de tasks.js
        //     db.models["Users"].associate(db.models); --> executa: Users.hasMany(db.models.Tasks); --. esse trecho está dentro de users.js
        // }
        
    }
    return db;
};

/*
esse código é responsável pela conexão com o banco e usa as configurações do arquivo config.js que está dentro da pasta libs
esse código de conexão adotará o design pattern singleton, ou seja, ele vai garantir que seja instanciada apenas uma vez a conexão com o Sequelize
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
O que são fs e path?

import fs from "fs";
import path from "path";

São módulos nativos do Node.js. Isso significa que você não precisa instalá-los com npm

### fs(File System) ###
É um módulo que permite interagir com o sistema de arquivos do computador.

Por exemplo, você pode:
- Ler arquivos.
- Criar arquivos.
- Excluir arquivos.
- Criar diretórios.
- Listar arquivos existentes em um diretório.

Exemplo:

import fs from "fs";

const arquivos = fs.readdirSync("./");

console.log(arquivos);

O método readdirSync() retorna um ### array com strings ### com os nomes dos arquivos e diretórios encontrados no caminho informado.

### Path ###

É um módulo que fornece ferramentas para trabalhar com caminhos de arquivos e diretórios
Exemplo:
import path from "path";

const caminho = path.join("C:", "Users", "Asus", "projeto", "index.js");

console.log(caminho);

resultado no windows:
C:\Users\Asus\projeto\index.js
resultado no linux:
C:/Users/Asus/projeto/index.js


O interessante é que o path.join() adapta os separadores de diretório conforme o sistema operacional.

No Windows, utiliza \.

No Linux e macOS, utiliza /.

### Como funciona o path.join() nesse projeto? ###

const dir = path.join(__dirname, "models");

__dirname: variável disponibilizada pelo CommonJS que representa o caminho absoluto do diretório onde esta o arquivo atual.
"models": nome do diretório que queremos acessar.

Exemplo de estrutura:
ntask-api/
│
├── index.js
│
├── db.js
│
├── models/
│   ├── task.js
│   └── user.js
│
└── libs/
    └── config.js

Suponha que db.js esteja dentro de libs
Nesse caso, o __dirname representa o caminho da pasta libs.

O resultado de path.join(__dirname, "models");

Seria:
C:\projeto\ntask-api\libs\models

Atenção: isso depende de onde o arquivo atual está localizado. No seu exemplo, se db.js estiver na raiz, o caminho será C:\projeto\ntask-api\models.

A função do código é ### construir o caminho até a pasta ### onde estão armazenados os modelos do banco de dados.


### Qual é a função de db? ###
Agora chegamos a uma parte importante:
let db = null;


Aqui estamos declarando uma variável chamada db e atribuindo inicialmente o valor null.

Mas por que fazer isso?

Observe a condição:
if (!db) {
    // configuração do banco
}


O operador ! representa uma negação lógica.

Como inicialmente db é null, temos:
!null // true


Portanto, o código dentro do if será executado.

Depois, observe:
db = {
    sequelize,
    Sequelize,
    models: {}
};


Aqui estamos criando um objeto chamado db.

Ele funciona como ### um objeto centralizador das informações e recursos ### relacionados ao banco de dados.

.Propriedade sequelize:

Essa propriedade recebe os valores da pasta config e é um instância da classe Sequelize.

Lembre-se:

Sequelize é a classe importada da biblioteca.

sequelize é a instância criada a partir dessa classe.

Essa instância é responsável por gerenciar a comunicação com o banco de dados.
Por meio dela é possível executar operações como:

sequelize.authenticate();
sequelize.sync();
sequelize.query();

Portanto, essa instância está guardada dentro de db para que outras partes da aplicação possam utilizá-las.

.Propriedade Sequelize:

Nesse caso está sendo guardado a própria biblioteca Sequelize dentro do objeto db.
Isso permite acessar recursos da biblioteca por meio do db.

Exemplo:
db.Sequelize.DataTypes.INTEGER

Enquanto db.sequelize representa a instância de conexão, db.Sequelize representa a biblioteca.

Propriedade	      O que representa
- db.sequelize	  - Instância do Sequelize
- db.Sequelize	  - Biblioteca Sequelize
- db.models	      - Objeto que armazenará os modelos

.Propriedade Models

Èla é um objeto vazio e será utilizado para armazenar todos os modelos que representam as tabelas dos bancos de dados

Imagine que você tenha dois modelos:
- Task: representa as tarefas.
- User: representa os usuários.
Depois que os modelos forem carregados, teremos algo semelhante a:
db.models = {
    Tasks: modeloTasks,
    Users: modeloUsers
};

Observe que cada propriedade desse objeto representa um modelo do Sequelize.

Isso facilita o acesso aos modelos em outras partes da aplicação:
app.db.models.Tasks
app.db.models.Users

Uma observação importante: o objeto db também funciona como um mecanismo de cache.

Como ele foi declarado fora da função:
let db = null;


ele continua existindo entre as chamadas da função.

Assim, depois que a primeira chamada inicializar o banco, as próximas chamadas não precisarão repetir toda a configuração.

### Carregando modelos com fs.readdirSync() ###
O trecho abaixo é responsável por localizar, carregar e armazenar os modelos do Sequelize.

const dir = path.join(__dirname, "models");

fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);

    db.models[model.name] = model;
});

.Localizando a pasta:
const dir = path.join(__dirname, "models"); // Isso constrói o caminho absoluto da pasta models

.Lendo os arquivos da pasta:
fs.readdirSync(dir) --> esse método lê o conteúdo do diretório informado.

Imagine que a pasta models tenha:
models/
    task.js
    user.js


O resultado será um array semelhante a:
[
    "task.js",
    "user.js"
]

O método possui Syn no nome pois é síncrono, ele espera a leitura terminar antes de continuar a execução.

.Percorrendo os arquivos com forEach():
O método forEach() é usado para percorrer o array retornado pelo readdirSync(). Em cada repetição, a variável file recebe um do nomes dos arquivos.
- Primeira repetição:
file="task.js"
- Segunda repetição:
file="user.js"

.Construindo o caminho de cada arquivo:
const modelDir = path.join(dir, file);
dir = "C:\\projeto\\ntask-api\\models";
file = "task.js";
resultado: modelDir é igual a => C:\projeto\ntask-api\models\task.js

.Carregando o modelo:
const model = sequelize.import(modelDir);

A intenção desse código é carregar o arquivo do modelo e registrá-lo no Sequelize

.Armazenando o modelo no objeto db:
db.models[model.name] = model;


Essa linha merece atenção.

Imagine que o modelo carregado tenha o nome:
model.name = "Tasks";


A expressão:
db.models[model.name] = model;


é equivalente a:
db.models["Tasks"] = model;


Portanto, estamos armazenando o modelo dentro do objeto db.models.

Se carregarmos dois modelos, teremos:
db.models = {
    Tasks: modeloTasks,
    Users: modeloUsers
};


Perceba como o código carrega automaticamente os modelos existentes na pasta, sem precisar escrever manualmente um require() para cada um

.Entendendo Object.keys() e associate().
Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
});

Esse trecho do código é responsável por estabelecer os relacionamentos entre modelos.

O que faz o Object.keys()?

É um método nativo do javascript que retorna um array contendo as propriedades enumeráveis de um objeto.
Exemplo:
const pessoa = {
    nome: "André",
    idade: 25,
    profissao: "Programador"
};

console.log(Object.keys(pessoa));

resultado:
[
    "nome",
    "idade",
    "profissao"
]

Agora ao objeto do projeto:
Object.keys(db.models)

Se o objeto estiver assim:
db.models = {
    Tasks: modeloTasks,
    Users: modeloUsers
};

O resultado será:
[
    "Tasks",
    "Users"
]

.Percorrendo os modelos.
Na primeira iteração:
key= "Task";
Na segunda iteração:
key= "Users"


### dúvida ###
__dirname que existe dentro de path.join() é um nome obrigatório para ser usado no primeiro parâmetro dessa função? Se for obrigatório, e nesse 
caso "const modelDir = path.join(dir,file);"?

---------------------------------------------------------------------------------------------------------------------------------------------------------------

Se eu usar sequelize, a instância de Sequelize, e depois usar Sequelize, a própria classe, não deveria se considerado algo redundante? Não seria 
mais fácil usar apenas Sequelize?

resposta:
A instância sequelize representa a conexão e a configuração da sua aplicação com o banco de dados.

Já a classe Sequelize disponibiliza funcionalidades da própria biblioteca.
---------------------------------------------------------------------------------------------------------------------------------------------------------------

então nesse trecho de código, abaixo, acontece o seguinte:
Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
});

Object.keys(db.models) => ["Tasks", "Users"]
forEach() =>{
    db.models["Tasks"].associate(db.models);
    db.models["Users"].associate(db.models);
}
entendo que o associate precisa ser definido nos proprios arquvios de modelos, mas não estou conseguindo entende-lo

Resposta:
Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
});

imagine que:

db.models = {
    Tasks: Tasks,
    Users: Users
};

// Primeira iteração:
db.models["Tasks"].associate(db.models);

// Segunda iteração:
db.models["Users"].associate(db.models);

Na primeira iteração, acontece:
Tasks.associate(db.models);


Que executa:
Tasks.belongsTo(db.models.Users);


Na segunda iteração:
Users.associate(db.models);


Que executa:
Users.hasMany(db.models.Tasks);

.Uma observação importante sobre a ordem de execução.
Veja a sequência do seu código:
fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    db.models[model.name] = model;
});


Primeiro, todos os modelos são carregados e armazenados em db.models.

Somente depois disso acontece:
Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
});


Isso é importante porque, quando Tasks.associate() for executado, o modelo Users já estará disponível, e vice-versa.

Se os relacionamentos fossem definidos durante o carregamento individual dos modelos, poderíamos tentar acessar um modelo que ainda não foi carregado.
---------------------------------------------------------------------------------------------------------------------------------------------------------------

*/

