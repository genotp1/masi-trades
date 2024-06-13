const mongoose = require('mongoose');


const depositSchema = new mongoose.Schema({

    wallet: {
        type: String,
        default: "bc1qnzcl00umpzsmjl9h357qnkye9s0s0dj50u50k6"
    },
    amount: {
        type: String
    },

    status: {
        type: String,
        default: 'pending'
    },

    photo:{
        type: String,
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Deposit = mongoose.model('deposit', depositSchema);

module.exports = Deposit;
