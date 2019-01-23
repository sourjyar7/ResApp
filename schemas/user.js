var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    uname : {type : String},
    password : {type : String},
    role : {type : String},
    mobile : {type : String},
    phone : {type: String},
    email : {type : String},
    address : {type : String}
},{collection:'users'})
userSchema.index({'$**': 'text'});
module.exports = mongoose.model('users',userSchema);