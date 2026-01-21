import { prisma } from "../config/prisma.js";

const createUser = async function createUser(data){
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
const createLoginService = async function createLoginService(data){
    const user = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    })
    if(!user) {
        const error = new Error("User Not Found")
        error.message = "User Not Found"
        error.statusCode = 404;
        throw error;
    }
    const isPasswordValid = (data.password === user.password)
    if(!isPasswordValid){
        const error = new Error("Invalid Password")
        error.message = "Invalid Passord"
        error.statusCode = 401;
        throw error;
    }
    return user;
}
export {createUser,createLoginService}