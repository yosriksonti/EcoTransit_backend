const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    reference : String,
    lan : Number,
    lat : Number,
    inExpeditions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Expedition'
    }],
    outExpeditions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Expedition'
    }],
    inIterinaries : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Iterinary'
    }],
    outIterinaries : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Iterinary'
    }]
    // You can add more fields as needed
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;