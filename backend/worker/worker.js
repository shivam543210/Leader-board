import "dotenv/config";
import Queue from "bull";

import {sendEmail} from "./email.handler.js"
import {welcomeEmailTemplate} from "./templates/welcomeEmail.template.js"
const emailQueue = new  Queue("email-queue")

export const processEmail = (async (job)=>{
    const {email,name} = job.data;
    const html = welcomeEmailTemplate({name})
    await sendEmail(email,"Welcome to our app",html)

})

// queue ke muh me isko lagana hai taki fun nikal sake 

emailQueue.process(processEmail);

