const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({ //automatically turns Name -> names collection
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{ //special mongoose feature (it's an array)
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//add an instance method onto the schema
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => { //return a promise because async.
    return token;
  });
};

//overriding so that not everything is sent back (we only want ID and email)
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
}
let User = mongoose.model('User', UserSchema);

// let a = new User({email: "andrew@example.com"});
//
// a.save().then((doc) => console.log('done'));

module.exports = {
  User
}
