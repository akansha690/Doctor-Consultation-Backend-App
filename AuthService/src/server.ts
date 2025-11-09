
import express, { Request, Response } from 'express';
import { serverConfig } from './config/server.config';
import v1Router from './routers';
import { JWTMiddleware } from './middlewares/jwt.middleware';

const app =  express();

app.use(express.json());


app.use('/api/v1' , v1Router)

app.use(JWTMiddleware, async (req:Request , res:Response)=>{
    const suffixUrl = req.url.split('/api/v1')[1];
    let targetUrl = "";

    if(req.url.includes('/booking') || req.url.includes('/slot') || req.url.includes('/doctor')){
        targetUrl = `http://localhost:4000/api/v1${suffixUrl}`;
    }
    console.log(`Fowarding request to ${targetUrl}`);
})


app.listen(serverConfig.PORT, ()=>{
    console.log(`Listening on port : ${serverConfig.PORT}`);
})