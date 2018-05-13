const jwt = require('jsonwebtoken')
const {Task} = require('../model/todomodel')
const  { User }  = require('../model/usermodel')
const mongoose = require('mongoose')
const pwd = process.env.SECRETCODE

module.exports = {

        addTask:function(req,res){
            //res.send('masuk')
            let token  = req.headers.token
            //Task.users.dropIndexes()
            let decoded  = jwt.verify(token, 'SECRET')
            //console.log(decoded)
            let taskList = new Task({
                userId: decoded.id,
                task: req.body.task,
                status: 'uncomplete',
                users:User._id
            })

        taskList
            .save((err,result) => {
                if(!err){
                    res.status(201).json({
                        message: 'task successed add',
                        data: result
                    })

                } else {
                    res.status(500).json({
                    message: 'something went wrong'
                    })
                }
            })
            
        
    },

    getlist:function (req,res) {
        let token  = req.headers.token
        let decoded  = jwt.verify(token, 'SECRET')
        token.id = decoded.id
        //console.log(decoded);
        
        Task.
            find({ userId: decoded.id })
                .populate('User','username')
                    .exec(function (err, todo) {
                if (err) {
                    console.log(err)
                }else{
                    res.status(200).json(todo)
                    // console.log(User.schema.paths.username);
                }
            });
    },
    
    updateTask: function (req, res) {
        let token = req.headers.token
        let decoded = jwt.decode(token,'SECRET')
        Task
        .find({userId:decoded.id ,task:req.body.task})
           .exec(function(err,task){
                if(err){
                    res.send(err)
                }else{              
                    res.send(task[0].status)
                }

                task[0].status = 'complete'
                task[0].save(function (err, updated) {
                    if (!err){
                        res.writeContinue()
                    }else{
                        return res.send(err);    
                    }
                    
                  });
            })        
      },

      deleteTask: function(req,res){
        console.log(req.params);
        
        Task.findByIdAndRemove(req.params.taskid, (err, task) => {  
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "task successfully deleted",
                // id: task._id
            };
            return res.status(200).send(response);
        });
        
          

      }

    

    

}