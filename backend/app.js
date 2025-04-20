const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();
const connectToDB = require('./db/db.js');
connectToDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRoutes = require('./routes/user.routes.js');

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.use('/users',userRoutes);

module.exports = app;   