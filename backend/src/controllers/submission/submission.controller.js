import { successResponse } from "../../utils/response.js";
import { submitService } from "../../services/submit.service.js"
import {submissionQueue} from "../../queue/submission.queue.js"

const submitController = async function submit(req,res){
    const submit = await submitService(req.body)

    successResponse(res,200,"Submission created successfully",submit)      
}

export {submitController}
