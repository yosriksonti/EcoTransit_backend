const mongoose = require('mongoose');

const expeditionScheme = new mongoose.Schema({
    reference : String,
    duration : Number,
    fromStation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Station'
    },
    toStation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Station'
    },
    iterinaryExpeditions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'IterinaryExpedition'
    }]
});

const Expedition = mongoose.model('Expedition', expeditionScheme);

module.exports = Expedition;