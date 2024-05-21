const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateId: {
        type: Number,
        required: true
    },
    stateName: {
        type: String,
        reqiured: true
    },
    stateCode: {
        type: String,
        reuired: true
    },
    stateStatus: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true
    });

var States = mongoose.model('States', stateSchema);

module.exports = States;