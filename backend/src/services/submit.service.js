import {prisma} from "../config/prisma.js";
import { submissionQueue } from "../queue/submission.queue.js";

async function submitService(data){
    const {user_id,problem_id,contest_id,score,status,code,language} = data;

    const submission = await prisma.submission.create({
        data:{
            user_id,    
            problem_id,
            contest_id,
            score,
            status:"PENDING",
            code,
            language
        }
    })
  await submissionQueue.add("executeSession",{
    submission: submission.submission_id
  })
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
