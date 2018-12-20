const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//npm install --save validator
const validator = require('validator');
//npm install --save bcryptjs
const bcryptjs = require('bcryptjs');
//npm install --save jsonwebtoken
const jwt= require('jsonwebtoken');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        //validate the format of the email -custom validation
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'Invalid email format'

            }
        }
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 128,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 10,
        trim: true,
        validate:{
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: function(){
                    return 'Invalid mobile format'
            }
        }
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

//to define our own instance methods
userSchema.methods.generateToken = function(){
    let user = this;
    let tokenData = {
        userId: this._id
    }
    let jwtToken = jwt.sign(tokenData, 'supersecret');
    user.tokens.push({ token: jwtToken});

    return user.save().then(function(user){
        return jwtToken
    })
}
//to define statics methods
userSchema.statics.findByToken = function(token){
    let User = this;
    let tokenData;
    try{
        tokenData = jwt.verify(token, 'supersecret')
    }catch(err){
        return Promise.reject(err.message)
    }

    return User.findOne({
        '_id': tokenData.userId,
        'tokens.token':token
    })
}
userSchema.pre('save',function(next){
    let user = this;
    if(user.isNew){
        bcryptjs.genSalt(10).then(function(salt){
            bcryptjs.hash(user.password,salt).then(function(encrypted){
                    user.passsword = encrypted;
                    next();
            })
            }).catch(function(err){
                console.log(err);
        })
    }else{
        next();
    }
    
})
//to define static methods
userSchema.statics.findByCredentials = function(email, password){
    let User = this;
    return User.findOne({email: email}).then(function(user){
        if(!user){
            return Promise.reject('Invalid email or password');
        }
        return bcryptjs.compare(password,user.password).then(function(res){
            if(res){
                return Promise.resolve(user)
            }else{
                return Promise.reject("Invalid email or password")
            }
        })
    })
}
const User = mongoose.model('User',userSchema);
module.exports={
    User
}
