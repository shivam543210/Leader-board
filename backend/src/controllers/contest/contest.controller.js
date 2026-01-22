
import { successResponse } from "../../utils/response.js";
import {createContestService} from "../../services/contest.Service.js"
async function createContestController(req,res){
    const contest = await createContestService(req.body)
    successResponse(res,200,"Contest created successfully",contest)
}
export {createContestController}    

