
import express from 'express';
import { serverConfig } from './config/server.config';
import v1Router from './routers';
import { JWTMiddleware } from './middlewares/jwt.middleware';
import { HTTPAxiosRequest } from './apiGateway/axios';
import { sequelize } from './models/sequelize';

const app =  express();

app.use(express.json());

app.use('/api/v1' , v1Router)


app.use(JWTMiddleware, HTTPAxiosRequest)

sequelize.sync({ alter: true });

app.listen(serverConfig.PORT, ()=>{
    console.log(`Listening on port : ${serverConfig.PORT}`);
})



