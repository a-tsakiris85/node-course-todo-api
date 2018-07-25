const mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, //stuff will fail if text isn't there.
    minlength: 1, //can't be empty. minlength is a validator.
    trim: true //gets rid of leading/trailing whitespace
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
})
let Todo = mongoose.model('Todo', todoSchema); //gives us a nice cosntructor to use


module.exports = {Todo};
