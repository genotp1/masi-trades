const mongoose = require('mongoose');
const  validator  = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    fullname:{
        type: String,
    },
    tel:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: validator.isEmail['Please enter an email']
        // required:  [isEmail, 'Please enter an email']
    },
    country:{
        type: String
    },
    gender:{
        type: String
    },
    password:{
        type: String,
    },
    photo:{
        type: String,
        default: 'profile.png'
    }, 
    balance:{
        type: String,
        default: "$0.00"
    },
    available:{
        type: String,
        default: "$0.00"
    },
    bonus:{
        type: String,
        default: "$0.00"
    },
    widthdrawBalance:{
        type: String,
        default: "$0.00"
    },
    deposits:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'deposit'
    },

    widthdraws:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'widthdraw'
    },
    role:{
        type: String,
        default: "user"
    }
})

// fire a function before doc saved to db
// userSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });

  // static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await (password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user', userSchema)

module.exports = User;
