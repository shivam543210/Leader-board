import { successResponse } from "../../utils/response.js";
import { createProblemService,createManyProblemService } from "../../services/problemCreate.service.js"

const createContestProblemController = async function createProblem(req,res){
    const createProblem = await createProblemService(req.body)
    successResponse(res,200,"Problem created successfully",createProblem)      
}
const createManyContestProblemController = async function createManyProblem(req,res){
    const data = req.body
    
    const createManyProblem = await createManyProblemService(data)
    successResponse(res,200,"Problem created successfully",createManyProblem)      
}
export {createContestProblemController,createManyContestProblemController}
