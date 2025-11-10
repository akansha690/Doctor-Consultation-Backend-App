
import axios from "axios";
import { Request, Response } from "express";

export async function HTTPAxiosRequest(req:Request , res:Response){
  

    const {
      host,                  // remove host
      'content-length': _,    // remove content-length
      connection,             // remove connection
      ...forwardHeaders       // the rest of the headers are safe to forward
    } = req.headers;

    
    try {
        const suffixUrl = req.url.split('/api/v1')[1];
        let targetUrl = "";
    
        if(req.url.includes('/booking') || req.url.includes('/slot') || req.url.includes('/doctor')){
            targetUrl = `http://localhost:4000/api/v1${suffixUrl}`;
        }
        console.log(`Fowarding request to ${targetUrl}`);
        const response = await axios({
            method: req.method,
            url : targetUrl,
            data:req.body,
            headers:{
               'Content-Type': 'application/json',
                ...forwardHeaders,
               
            },
        })
        res.status(response.status).json({
            data:response.data,
            success: response.data.success
        })
    } catch (error:any) {
        res.status(500).json({
            message: "Gateway error",
            error: error.message,
            success: false
        });
    }


}