
import { successResponse } from "../../utils/response.js";
import {submitService} from "../../services/contest.Service.js"
async function submitController(req,res){
    const submit = await submitService(req.body)
    successResponse(res,200,"Submission created successfully",submit)
   
}
export {submitController}    

