import {asyncHandler, successResponse} from "../../utils/response.js"
import {createUser as createUserService,createLoginService} from "../../services/user.service.js"
import {generateToken} from "../../utils/jwt.js"
const registerUser = async(req,res)=>{
    const user = await createUserService(req.body);
   
    const token = generateToken({ userId: user.user_id});
    const {password,...rest} = user;
    rest.token = token;

    successResponse(res,200,"User created successfullly",rest)      
    
}
const loginUser = async function loginUser(req,res){
    const user = await createLoginService(req.body);
    const token = generateToken({ userId: user.user_id})
    const {password , ...rest} = user
    successResponse(res,200,"User logged in successfully",{
        user:rest,
        token
    })
}
export { registerUser as createUser , loginUser as login}
