
const express = require('express');

const {userRouter} = require("./Routes/user_router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/users',userRouter);

app.use('*',(req,res)=>{
    res.status(404).json('Route not found =(')
})

app.listen(5000, () => {
    console.log('Server listen on  5000');
});