const express = require('express');
const router = express.Router();
const { addTask,getlist,updateTask,deleteTask } = require('../controller/todo.controller')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addTask',addTask)
router.get('/getlist',getlist)
router.put('/updateTask',updateTask)
router.delete('/deleteTask/',deleteTask)



module.exports = router;
