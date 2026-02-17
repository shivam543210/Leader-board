import "dotenv/config";
import Queue from "bull";
import {prisma} from "../src/config/prisma.js"
import {submissionQueue} from "../src/queue/submission.queue.js"
import fs from "fs"
import path from "path"
import { v4 as uuid } from "uuid";
import { exec } from "child_process";
import { stderr, stdout } from "process";
import { error } from "console";

console.log("Worker started...");

//add code in a file 
async function writeCodeTOFile(code,language){
   const id = uuid();
 const dir = path.join(process.cwd(),"temp");
  

 if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
const filepath = path.join(dir,`${id}.${language}`);
fs.writeFileSync(filepath,code);
return filepath;

}

// function to run this path code
async function runjs(filepath){
   return new Promise((resolve,reject)=>{
      exec(`node ${filepath}`,{timeout:3000},(error,stdout,stderr)=>{
         if(error){
            reject(error)
         }
         resolve(stdout)

      })
   })
 }

//actual process of the queue
submissionQueue.process("executeSession",async(job)=>{
   console.log(job.data.submission_id)
   
   const submissionId = job.data.submission_id;
   const submission = await prisma.submission.findUnique({
      where:{
         submission_id: submissionId
      }
   })
   if(!submission){
      throw new Error("Submission not found")
      return;
   }
    if (submission.status !== "PENDING") {
   console.log("Already processed, skipping");
   return;
  }
   
   const filepath = await writeCodeTOFile(submission.code,submission.language)

      // mark running 
  
try{
   await prisma.submission.update({
      where:{
         submission_id: submissionId
      },
      data:{
         status:"RUNNING"
      }
   })

   //add exec to  by child process
   const result = await runjs(filepath)
   console.log(result);

   
   await prisma.submission.update({
      where:{
         submission_id: submissionId

      },
      data:{
            status:"COMPLETED",
            score:100
         }
   })
   }catch(error){
      console.log("Execution failed",error.message);
       
      await prisma.submission.update({
         where:{
            submission_id: submissionId
         },
         data:{
            status:"FAILED",
         
         }
      })
      throw error

   }
   
})



