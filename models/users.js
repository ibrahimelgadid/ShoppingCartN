const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSChema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:'/images/noimage.png'
    },
    address:{
        type:String
    },
    contact:{
        type:String
    }

},{timestamps:true})

userSChema.methods.hashPass = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}

userSChema.methods.comparePass = function (password) {
    return bcrypt.compareSync(password,this.password)
}


module.exports = mongoose.model('users',userSChema)