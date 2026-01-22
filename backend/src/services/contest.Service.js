import {prisma} from "../config/prisma.js"

async function createContestService(data){

    const contest=await prisma.contest.create({
        data:{
            title:data.title,
            start_time:data.start_time,
            end_time:data.end_time
        }
    })
    return contest
}
export {createContestService}