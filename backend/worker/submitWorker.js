import "dotenv/config";
import Queue from "bull";
import {prisma} from "../src/config/prisma.js"
import {submissionQueue} from "../src/queue/submission.queue.js"

console.log("Worker started...");

//console.log job.data

submissionQueue.process("executeSession",async(job)=>{
  
   const submissionId = job.data.submission;
   const submission = await prisma.submission.findUnique({
      where:{
         submission_id: submissionId
      }
   })
   // mark running 
   await prisma.submission.update({
      where:{
         submission_id: submissionId,
         data:{
            status:"RUNNING"
         }
      }
   })
   try{
        //fake execution
        console.log("executing submission",submissionId)
        await new Promise(res => setTimeout(res,2000))
        console.log("execution completed",submissionId)
        //mark compleate
        await prisma.submission.update({
         where:{
            submission_id: submissionId

         },
         data:{
            status:"COMPLETED",
            score:100
         }
        })
   }
   catch(error){
      console.log(error)
   }
   if(!submission){
      throw new Error("Submission not found")
      return;
   }
   console.log("processing submission",submissionId)
   

})


