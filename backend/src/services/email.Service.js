import { emailQueue } from "../queue/email.queue.js";
export const sendWelcomeEmail = async (user) => {
  if (!user?.email) {
    throw new Error("Email is required");
  }

  await emailQueue.add(
    "WELCOME_EMAIL",
    {
      email: user.email,
      name: user.name,
    },
    {
      jobId: `welcome-${user.email}`,
      attempts: 3,
      backoff: 5000,
      removeOnComplete: true,
    }
  );
};
