import {prisma} from "../config/prisma.js";

async function createProblemService(data){
    const problem = await prisma.problem.create({
        data:{
            name:data.name,
            Test:data.Test,
            contest_id:data.contest_id,
            description:data.description,
            max_score:data.max_score,
            max_time:data.max_time
        }
    })
    return problem
}
// data{
    //   contest_id : "",
    //   problems : [
    //     {},{}
    //   ]         
// } 
//
//
async function createManyProblemService(data){
    const queue = []
    //[{},{},{}] multiple object 
    for(let i = 0 ; i < data.problems.length;i++){
        queue.push({
            name:data.problems[i].name,
            Test:data.problems[i].Test,
            contest_id:data.contest_id,
            description:data.problems[i].description,
            max_score:data.problems[i].max_score,
            max_time:data.problems[i].max_time
        })
    }
    const problems = await prisma.problem.createMany({
        data: queue
    })
    return problems
}
export {createProblemService,createManyProblemService}

// model Problem {
//   problem_id  String @id @default(cuid())
//   name String? 
//   Test String? 
//   contest_id String
//   description String
//   max_score   Int @default(0)
//   max_time    Int @default(0)
//   contest     Contest     @relation(fields: [contest_id], references: [contest_id])
//   submissions Submission[]
// }