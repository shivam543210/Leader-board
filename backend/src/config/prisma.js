import { PrismaClient } from '@prisma/client';
import { Logger } from "./logger.js";
import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

async function prismaConnect(){
     try{
        await prisma.$connect();
        Logger.info("prisma is connected to database")
     }
     catch(error){
        Logger.error("prisma connection failed",error)
     }
}

export default prismaConnect;