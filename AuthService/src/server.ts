
import express from 'express';
import { serverConfig } from './config/server.config';
import v1Router from './routers';
import { JWTMiddleware } from './middlewares/jwt.middleware';
import { HTTPAxiosRequest } from './apiGateway/axios';

const app =  express();

app.use(express.json());

app.get('/', (req , res)=>{
    res.send('Payment Service is up and running');
})

app.use('/api/v1' , v1Router)


app.use(JWTMiddleware, HTTPAxiosRequest)

// sequelize.sync({ alter: true });


app.listen(serverConfig.PORT, '0.0.0.0', ()=>{
    console.log(`Listening on port : ${serverConfig.PORT}`);
})



