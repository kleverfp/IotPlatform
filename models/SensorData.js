const mongoose = require('mongoose');


const SensorDataSchema = new mongoose.Schema({

    sensor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sensor'
    },
    data:{
        type:Array,
        default:[],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});


module.exports = sensorData = mongoose.model('sensorData',SensorDataSchema);