import "dotenv/config";
import Queue from "bull";
import {prisma} from "../config/prisma.js"
import {submissionQueue} from "../src/queue/submission.queue.js"

export const submitWorker = (async (job)=>{
  const submissionId = job.data.submission;
     const submission = await prisma.submission.findUnique({
        where:{
              submission_id: submissionId
        }
     })

     if(!submission){
        return
     }
    
    const {user_id,problem_id,contest_id,score,status,code,language} = submission;
    
    

})

// queue ke muh me isko lagana hai taki fun nikal sake 

submissionQueue.process("executeSession",submitWorker);

