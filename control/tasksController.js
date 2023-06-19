
const tasksController = function (Tasks) {
    console.log('TAAAASK',Tasks)
    console.log('user',req.params.user )

        const getTasks = function (req, res) {
            Tasks.find({ user: req.params.user }).exec(function (tasks) {
            let taskList = [];
            console.log(tasks)
            for (let i = 0; i < tasks.length; i++) {
                taskList.push(tasks[i])
            }
            res.status(200)
            res.json({
                Tasks: taskList
            })
        })
    };

    const addTasks = function (req, res) {
        let taskList = {
            name: req.body.task,
            status: req.body.status,
            user: req.body.user

        };
        const tasksBd = new Tasks(taskList);

        tasksBd.save(function (err) {
            if (err) {
                res.status(500);
                res.send('Erro : falha ao incluir produto...' + err);
            }
            else {
                res.status(201);
                res.send(taskList.name)
            };
        });
    };

    const changeTaskToDoing = function (req, res) {
        Tasks.findByIdAndUpdate(req.params.id, { status: 'doing' }, function (err) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(201);
                res.send("Status alterado");
            };
        });
    };

    const changeTaskToDone = function (req, res) {
        Tasks.findByIdAndUpdate(req.params.id, { status: 'done' }, function (err) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(201);
                res.send("Status alterado");
            };
        });
    };

    const changeTaskToDo = function (req, res) {
        Tasks.findByIdAndUpdate(req.params.id, { status: 'to-do' }, function (err) {
            if (err) {
                res.status(404);
                res.send("erro" + err);
            }
            else {
                res.status(201);
                res.send("Status alterado");
            };
        });
    };

    const deleteTask = function (req, res) {
        Tasks.findById(req.params.id, function (Tasks) {
            Tasks.remove(function (err) {
                if (err) {
                    res.status(204);
                    res.send('ooops... erro ao deletar sua tarefa' + err)
                }else{
                    res.status(200);
                    res.send('tarefa deletada com sucesso')
                }
            });
        });
    };

    return {
        getTasks: getTasks,
        addTasks: addTasks,
        changeTaskToDoing: changeTaskToDoing,
        changeTaskToDone: changeTaskToDone,
        changeTaskToDo: changeTaskToDo,
        deleteTask: deleteTask,
    }
};
module.exports = tasksController;