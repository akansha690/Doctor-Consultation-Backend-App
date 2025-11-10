
import express from 'express';
import { serverConfig } from './config/server.config';
import v1Router from './routers';
import { JWTMiddleware } from './middlewares/jwt.middleware';
import { HTTPAxiosRequest } from './apiGateway/axios';

const app =  express();

app.use(express.json());

app.use('/api/v1' , v1Router)


// app.use(JWTMiddleware, async (req:Request , res:Response)=>{

//     const {
//       host,                  // remove host
//       'content-length': _,    // remove content-length
//       connection,             // remove connection
//       ...forwardHeaders       // the rest of the headers are safe to forward
//     } = req.headers;

    
//     try {
//         const suffixUrl = req.url.split('/api/v1')[1];
//         let targetUrl = "";
    
//         if(req.url.includes('/booking') || req.url.includes('/slot') || req.url.includes('/doctor')){
//             targetUrl = `http://localhost:4000/api/v1${suffixUrl}`;
//         }
//         console.log(`Fowarding request to ${targetUrl}`);
//         const response = await axios({
//             method: req.method,
//             url : targetUrl,
//             data:req.body,
//             headers:{
//                'Content-Type': 'application/json',
//                 ...forwardHeaders,
               
//             },
//         })
//         res.status(response.status).json({
//             data:response.data,
//             message:"Forwarded the request successfully",
//             success: response.data.success
//         })
//     } catch (error:any) {
//         res.status(500).json({
//             message: "Gateway error",
//             error: error.message,
//             success: false
//         });
//     }

// })

app.use(JWTMiddleware, HTTPAxiosRequest)

app.listen(serverConfig.PORT, ()=>{
    console.log(`Listening on port : ${serverConfig.PORT}`);
})