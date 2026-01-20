function asyncHandler(registerUser){
    return async function register(req,res,next){
        try{
            await registerUser(req,res,next)
        }
        catch(error){
            next(error)
        }
    }
}



function successResponse(res,statuscode,message,data){
    return res.status(statuscode).json({
        status: "success",
        message,
        data
    })
}

function errorResponse(req,res,statuscode,message,error){
    return res.status(statuscode).json({
        status: "error",
        message,
        error
    })
}
export {asyncHandler,successResponse,errorResponse}