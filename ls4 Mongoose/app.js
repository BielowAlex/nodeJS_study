const express = require('express');
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/nodeJS_study');
mongoose.connect('mongodb+srv://admin:admin@cluster0.fvlmk.mongodb.net/nodeJS_study');

const {userRouter} = require("./Routes/user_router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Route not found =(')
});

app.use((err,
         req,
         res,
         next) => {
    res
        .status(err.status||500)
        .json({
            error:err.message || 'Unknown error!'
        })
})

app.listen(5000, () => {
    console.log('Server listen on  5000');
});