const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const ConnectDB = async ()=>{
    try {

        await mongoose.connect(db);
        console.log("db connected");
        
    } catch (error) {
        console.error(error.message);
        process.exit(1);
        
    }
}


module.exports =ConnectDB;
