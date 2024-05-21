const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

const User = new Schema({
    username:{
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        reqiured: true
    }
});

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

User.plugin(passportLocalMongoose);
 

module.exports =  mongoose.model('User', User);
 