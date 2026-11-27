module.exports=app=>{
    const Tasks=app.models.tasks; // acessa o arquivo task do diretório models e associa a const Task
    app.get("/tasks",(req,res)=>{ // cria um endpoint: associa uma rota(task) a uma requisição http e processa os dados
        Tasks.findAll({},(tasks)=>{ // essa função está presento no arquivo task do diretório models
            res.json({task:tasks}); // esse response retorna um response
        });
    });
};

// esse arquivo exporta ao index principal uma função que usa a função presente do arquivo task do diretório models