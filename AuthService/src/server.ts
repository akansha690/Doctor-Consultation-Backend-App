
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

// app.listen(serverConfig.PORT, ()=>{
//     console.log(`Listening on port : ${serverConfig.PORT}`);
// })


sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connection successful!");

    // Sync models after successful connection
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ All tables synced");

    // Start server after DB is ready
    app.listen(serverConfig.PORT, ()=>{
         console.log(`Listening on port : ${serverConfig.PORT}`);
    })
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
  });
