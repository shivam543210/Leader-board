import {prisma} from "../config/prisma.js";
import { submissionQueue } from "../queue/submission.queue.js";

async function addTOqueue(id){
  console.log("id",id)
   await submissionQueue.add("executeSession",{
    submission_id:id
   },{
    attempts:3,
    backoff:50000
   })
   console.log("Job added to queue")
}
async function submitService(data){
    const {user_id,problem_id,contest_id,score,status,code,language} = data;
    console.log(data);

    const submission = await prisma.submission.create({
        data:{
            user_id,    
            problem_id,
            contest_id,
            language,
            code,
            score,  
            status:"PENDING",

        }
    })
  await addTOqueue(submission.submission_id)

    return submission
}


export {submitService}


//  user_id    String
//   problem_id String
//   contest_id String
//   language   String
//   code       String
//   score        Int
//   status       String
//   submitted_at DateTime @default(now())
