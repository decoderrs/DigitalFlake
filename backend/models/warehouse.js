const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    warehouseId: {
        type: Number,
        required: true
    },
    warehouseName: {
        type: String,
        reqiured: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId, ref: 'States',
        required: true
    },
    
    city: {
        type: mongoose.Schema.Types.ObjectId, ref: 'city',
        required: true
    },
    warehouseStatus: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true
    });

var Countries = mongoose.model('Warehouses', countrySchema);

module.exports = Countries;

