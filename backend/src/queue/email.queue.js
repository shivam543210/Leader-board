import Queue from "bull"

export const emailQueue = new Queue("email-queue");