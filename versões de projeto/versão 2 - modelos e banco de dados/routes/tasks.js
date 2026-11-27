module.exports=app=>{
    const Tasks=app.db.models.Tasks;
    app.get("/tasks",(req,res)=>{
        Tasks.findAll({}).then(tasks=>{
            res.json({task:tasks});
        });
    });
};

// esse arquivo é um endpoint. caso seja escrito o recurso /task, ele executa o código do arquivo models.task
/*
app.db.sync()	Sincroniza a estrutura dos modelos com o banco
Task.create()	Insere um registro
Task.findAll()	Consulta registros
Task.update()	Atualiza registros
Task.destroy()	Exclui registros
*/