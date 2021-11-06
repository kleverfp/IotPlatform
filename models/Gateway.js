const mongoose = require('mongoose');

const GatewaySchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    name:{
        type:String,
        required:true
    },
    gatewayId:{
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
    date:{
        type:Date,
        default:Date.now
    },

});


module.exports = gateway = mongoose.model('gateway',GatewaySchema);