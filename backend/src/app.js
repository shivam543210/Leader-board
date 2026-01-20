import express from 'express';
import {errorhandler} from './middlewares/error.middleware.js';
import {prisma} from './config/prisma.js';
import router from './routes/user.routes.js';


const app = express();
app.use(express.json())
app.use(errorhandler)
app.use('/api',router)


app.listen (9000,async()=>{
    await prisma.$connect();
    console.log("Database Connected");
    console.log("Server is running on port 9000")
})
