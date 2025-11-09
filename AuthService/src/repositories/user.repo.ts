import BaseRepository from ".";
import User from "../models/user"

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
                throw error;
            }
        }
}