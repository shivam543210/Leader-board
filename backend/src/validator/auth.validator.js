import Joi from "joi";

export const registrationSchema = Joi.object({ //function ke ander ek object kyu hai ye samjha nahi aaya 
    name: Joi.string().required(), 
    email: Joi.string().required(),
    password: Joi.string().required(),

})

export const LoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})
