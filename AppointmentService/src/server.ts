


import express from 'express';
import { serverConfig } from './configs/config';

const app =  express();

app.use(express.json());

app.use('/' , (req, res)=>{
    return res.status(200).json({
        message: "Success"
    })
})

app.listen(serverConfig.PORT, ()=>{
    console.log(`Listening on port : ${serverConfig.PORT}`);
})