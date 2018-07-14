var mongoose = require('mongoose');

//anonymous schema
let User = mongoose.model('User', { //automatically turns Name -> names collection
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

// let a = new User({email: "andrew@example.com"});
//
// a.save().then((doc) => console.log('done'));

module.exports = {
  User
}
