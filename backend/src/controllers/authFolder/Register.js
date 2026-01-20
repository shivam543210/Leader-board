import {asyncHandler, successResponse} from "../../utils/response.js"
import {createUser as createUserService} from "../../services/user.service.js"
import {generateToken} from "../../utils/jwt.js"
const registerUser = async(req,res)=>{
    const user = await createUserService(req.body);
   
    const token = generateToken({ userId: user.user_id});
    const {password,...rest} = user;
    rest.token = token;

    successResponse(res,200,"User created successfullly",rest)      
    
}

export { registerUser as createUser }
