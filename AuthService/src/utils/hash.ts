
 
import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  try {
    const saltRounds = 10; 
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
     throw new Error("Failed to hash")
  }
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error("Password is not matching")
  }
}