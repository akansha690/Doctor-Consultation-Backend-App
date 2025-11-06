


import express from 'express';

const app =  express();

const PORT = 4000;

app.use(express.json());

app.use('/' , (req, res)=>{
    return res.status(200).json({
        message: "Success"
    })
})

app.listen(PORT, ()=>{
    console.log(`Listening on port : ${PORT}`);
})