require('dotenv').config();
const express =require('express');
const app =express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const connectDB = require('./lib/db');
const cookieParser = require("cookie-parser");



app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

app.use(express.static('public'));
connectDB();
app.get('/',(req,res)=>{
    res.send('Hello World');
});

console.log("PORT from env:", process.env.PORT);

const PORT =process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);   
});
