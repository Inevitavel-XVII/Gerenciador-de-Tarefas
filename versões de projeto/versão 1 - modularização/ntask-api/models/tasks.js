module.exports=app=>{
    return{
        findAll:(params, callback)=>{
            return callback ([
                {title: "Fazer Compras"},
                {title: "Consertar o PC"},
            ]);
        }
    };
};

// nessa primeira versão do projeto, essa pasta exporta ao index principal a função acima.
// findAll se comporta como "select * from <tabela>"
// Esse modelo inicialmente terá apenas uma função tasks.findAll() que receberá dois argumentos como parâmetro: params e callback. A variável params não será utilizada
// no momento, mas ela servirá de base para enviar alguns filtros de pesquisa SQL, algo será abordado nos próximos capítulos. Já o segundo argumento é a função de 
// callback que retorna de forma assícrona um array stático de tarefas.
