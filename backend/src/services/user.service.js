import { prisma } from "../config/prisma.js";

export const createUser = async function createUser(data){
    const existingUser = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    })
    if(existingUser){
        const error = new Error("user already exists")
        error.message = "User already exists"
        error.statusCode = 400;
        throw error;
    }
    const user = await prisma.user.create({
        data:{
          name:data.name,
          email:data.email,
          password:data.password          
        }
    })
    return user;
}