const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      User = require('./usermodel')


var taskSchema = new mongoose.Schema({ 
  userId:String,
  task: String,
  status: String,
  users: [{ type: Schema.Types.ObjectId, ref:'User',required:true }]
   },
  {
    timestamps: true
  });

  var Task = mongoose.model('taskList', taskSchema);

module.exports = { Task }