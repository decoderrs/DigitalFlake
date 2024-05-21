const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    cityId: {
        type: Number,
        required: true
    },
    cityName: {
        type: String,
        reqiured: true
    },
    cityCode: {
        type: String,
        reuired: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId, ref: 'States',
        required: true
    },
    cityStatus: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true
    });

var Cities = mongoose.model('City', citySchema);

module.exports = Cities;