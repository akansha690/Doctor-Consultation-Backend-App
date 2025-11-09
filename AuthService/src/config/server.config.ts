
import dotenv from 'dotenv';
dotenv.config();

type serverconfig = {
    PORT : number,
}


type dbconfig = {
    DB_NAME: string
    DB_HOST : string,
    DB_PORT : number,
    DB_PASS : string,
    DB_USER: string
}

const serverConfig : serverconfig={
    PORT : Number(process.env.PORT) || 4000,
}

const dbConfig : dbconfig={
    DB_NAME: String(process.env.DB_NAME),
    DB_HOST : String(process.env.DB_HOST),
    DB_PORT : Number(process.env.DB_URL),
    DB_PASS: String(process.env.DB_PASS),
    DB_USER: String(process.env.DB_USER)
}

export {
    serverConfig,
    dbConfig
}

