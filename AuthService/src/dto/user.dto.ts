import { enumRole } from "../models/user"

export type createUserDTO={
    email: string,
    username: string,
    password:string,
    role: enumRole
}

export type loginUserDTO={
    email: string,
    password:string
}

