const mongoose = require('mongoose');


const SensorSchema = new mongoose.Schema({
    gateway:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'gateway'

    },
    name:{
        type:String,
        required:true
    },
    sensorId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    gps:{
        lon:{
            type:String
        },
        lat:{
            type:String
        }
    },
    location:{
        country:{
            type:String
        },
        province:{
            type:String
        },
        city:{
            type:String
        },
        neighborhood:{
            type:String
        },
        street:{
            type:String
        },
        zipCode:{
            type:String,
        }
    },
    communication:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },

});

module.exports  =sensor = mongoose.model('sensor',SensorSchema);