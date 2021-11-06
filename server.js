const express = require('express');
const ConnectDB = require('./config/db');
const app = express();

ConnectDB();
app.use(express.json({extended:false}));

app.use('/api/user', require('./routes/user'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/gateway',require('./routes/gateway'));
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT} `);
})



