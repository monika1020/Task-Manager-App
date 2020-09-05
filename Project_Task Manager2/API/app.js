const express = require('express');
const app = express();
var cors = require('cors');

const {mongoose} = require('./db/mangoose');

const bodyParser = require('body-parser');

const {List , Task } = require('./db/models');

//const { List } = require('./db/models/list.model');
//const {Task } = require('./db/models/task.model');



app.use(bodyParser.json());
app.use(cors())
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
  });
*/


app.get('/lists', (req , res)=>{
    //res.send("Hello World!");
//show the list
    List.find({}).then((lists)=>{
        res.send(lists);
    }).catch((e)=>{
        res.end(e);
    });

})

//create list 
app.post('/lists', (req , res)=>{
    let title = req.body.title;

    let newList = new List({
        title
    });

    newList.save().then((listDoc)=>{
        res.send(listDoc);
    })

});

//update the list
app.patch('/lists/:id', (req , res)=>{
    //res.send("Hello World!");
    List.findOneAndUpdate({_id:req.params.id},{
        $set:req.body
    }).then(()=>{
        res.sendStatus(200);
    });

});


app.delete('/lists/:id', (req , res)=>{
  //  res.send("Hello World!");
  List.findOneAndRemove({_id:req.params.id}).then((removedListDoc)=>{
    res.send(removedListDoc)
  })

});


//to see the task
app.get('/lists/:listId/tasks',(req , res)=>{

    Task.find({
        _listId: req.params.listId}).then((tasks)=>{
        res.send(tasks);
    })
});

//to create a task
app.post('/lists/:listId/tasks',(req,res)=>{
    let newTask = new Task({
        title:req.body.title,
        _listId:req.params.listId
    });

    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
});

//update a task
app.patch('/lists/:listId/tasks/:taskId',(req, res)=>{
Task.findOneAndUpdate({
    _id:req.params.taskId,
    _listId:req.params.listId
},{
    $set:req.body
}).then(()=>{
    res.send({message: 'updated successfully'});
})
});

app.delete('/lists/:listId/tasks/:taskId', (req,res)=>{
    Task.findOneAndRemove({
        _id:req.params.taskId,
        _listId:req.params.listId
    }).then((removeTaskDoc)=>{
        res.send(removeTaskDoc);
    })
});

app.listen(3000,()=>{
    console.log("server is listerning on port 3000");
});