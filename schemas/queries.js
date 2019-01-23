var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const querySchema = new Schema({
    qcreator : {type: String},
    qheading : {type: String},
    qreq : { type: String},
    qremarks: {type: String},
})

module.exports = mongoose.model('query',querySchema)