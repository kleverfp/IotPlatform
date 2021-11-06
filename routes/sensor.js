const express = require('express');
const {body,validationResult} = require('express-validator');
const router = express.Router();
const Sensor = require('../models/Sensor');
const Gateway = require('../models/Gateway');
const auth = require('../middleware/auth');

router.post('/new/:gatewayId',auth,[
    body('name','Sensor name is required').trim().not().isEmpty(),
    body('sensorId','sensorId  is required').trim().not().isEmpty(),
    body('type','sensor type is required').trim().not().isEmpty(),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({msg:errors.array()});
    
    const {name,sensorId,type,communication,lon,lat,country,province,city,neighborhood,street,zipCode} = req.body; 
    try {
        const gateway = await Gateway.findOne({gatewayId:req.params.gatewayId})
        let sensor = await Sensor.find({gateway:gateway._id});

        
        const msgError =[];
        const sensorName = sensor.map((sensorItem)=>sensorItem.name).indexOf(name);
       
        if(sensorName >= 0)
            msgError.push({error:'name already existis'});
        
        const sensorExistId = sensor.map((sensorItem)=>sensorItem.gatewayId).indexOf(sensorId);

        if(sensorExistId  >= 0)
            msgError.push({error:'sensorId already existis'});

        if(msgError.length > 0)
            return res.status(400).json({msg:msgError});
        
            const sensorFields ={};
            console.log("ok");
            sensorFields.gateway =gateway._id;
            sensorFields.name = name;
            sensorFields.sensorId = sensorId;
            sensorFields.type = type;
            sensorFields.communication = communication;
            sensorFields.gps ={};
            if(lon)sensorFields.gps.lon = lon;
            if(lat)sensorFields.gps.lat =lat;
            sensorFields.location={};
            if(country)sensorFields.location.country =country;
            if(province)sensorFields.location.province =province;
            if(city)sensorFields.location.city =city;
            if(neighborhood)sensorFields.location.neighborhood =neighborhood;
            if(street)sensorFields.location.street = street;
            if(zipCode)sensorFields.location.zipCode = zipCode;
    
            sensor = new Sensor(sensorFields);
    
            await sensor.save();
    
            res.json(sensor);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:'server error'});        
    }

});

router.get('/:sensorId',auth,async(req,res)=>{
    try {
        let sensor = await Sensor.findOne({sensorId:req.params.sensorId});

        if(!sensor)
            return res.status(400).json({msg:'sensor not found'});
        
        res.json(sensor);

    } catch (error) {
        
    }
});

router.get('/gateway/:gatewayId',async (req,res)=>{
    try {
        const gateway = await Gateway.findOne({gatewayId:req.params.gatewayId});
        if(!gateway)
            return res.status(400).json({msg:'gateway not found'});

        const sensor = await Sensor.find({gateway:gateway._id});
        if(!sensor)
            return res.status(400).json({msg:'no sensors'});
        
        res.json(sensor);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({msg:'server error'});
    }
})


module.exports = router;