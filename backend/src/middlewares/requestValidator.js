export const validate = (objectSchema) => {
    return function validator (req,res,next){
        const {error,value} = objectSchema.validate(req.body,{
             abortEarly: false
        })
        if(error){
            error.status = 400;
            return next(error)  
        }
        req.body = value;
        next()
    }
}