import BaseRepository from ".";
import User from "../models/user"
import { InternalServerError } from "../utils/error/error";

export class UserRepository extends BaseRepository<User>{
    constructor(){
        super(User);
    }
    async findByCredentials(email:string): Promise<User | null>{
            try {
                const record = await User.findOne({
                    where:{
                        email
                    }
                });
                if(!record){
                    return null;
                }
                return record; 
            } catch (error) {
                console.log(error);
                throw new InternalServerError("Something went wrong")
            }
        }
}