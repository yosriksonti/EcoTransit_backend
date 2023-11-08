const mongoose = require('mongoose');

const iterinaryExpeditionScheme = new mongoose.Schema({
    reference : String,
    arriveTime : Date,
    leaveTime : Date,
    iterinary : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Iterinary'
    },
    expedition : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Expedition'
    },
});

const IterinaryExpedition = mongoose.model('IterinaryExpedition', iterinaryExpeditionScheme);

module.exports = IterinaryExpedition;