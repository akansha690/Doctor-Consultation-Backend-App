
import dotenv from 'dotenv';
dotenv.config();

type config = {
    PORT : number,
}


type dbConfig = {
    DB_HOST : string,
    DB_PORT: number
}

const serverConfig : config={
    PORT : Number(process.env.PORT) || 4000,
}


export {
    serverConfig
}

