var mongoose = require('mongoose');

//anonymous schema
let User = mongoose.model('Model', { //automatically turns Name -> names collection
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {
  User
}
