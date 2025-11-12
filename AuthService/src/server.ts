
import express from 'express';
import { serverConfig } from './config/server.config';
import v1Router from './routers';
import { JWTMiddleware } from './middlewares/jwt.middleware';
import { HTTPAxiosRequest } from './apiGateway/axios';

const app =  express();

app.use(express.json());

app.use('/api/v1' , v1Router)


app.use(JWTMiddleware, HTTPAxiosRequest)

app.listen(serverConfig.PORT, ()=>{
    console.log(`Listening on port : ${serverConfig.PORT}`);
})