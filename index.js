const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config');


//create  express server
const app = express();

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// read and parser body
app.use(express.json());


//routes

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/uploads', require('./routes/uploads'));

//Bd
dbConnection()


app.listen(process.env.PORT, () =>{
    console.log('server run'+ process.env.PORT);
});