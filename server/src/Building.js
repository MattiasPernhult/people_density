var mongoose = require('mongoose');

var BuildingSchema = new mongoose.Schema({
    timestamp: String,
    floors: [{
            name: String,
            people: Number,
            soundLevel: Number
        }]
});

module.exports = mongoose.model('Building', BuildingSchema);
