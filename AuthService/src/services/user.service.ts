
import { createUserDTO, loginUserDTO } from "../dto/user.dto";
import { UserRepository } from "../repositories/user.repo";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt.util";


const userRepository = new UserRepository();

export async function registerUser(data: createUserDTO){
    const hashedPass = await hashPassword(data.password)
    const user = await userRepository.create({
        ...data,
        password: hashedPass
    }); 
    return user;
}

export async function loginUser(data: loginUserDTO){
    
    const user = await userRepository.findByCredentials(data.email);
    if(!user){
        throw new Error("Please Register");
    }
    const isMatch = await comparePassword(data.password, user.password);

    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role:user.role
    }

    const token = await generateToken(payload);
    if(!token){
        throw new Error("Error generating Token");
    }
    return {isMatch, token};
    
}