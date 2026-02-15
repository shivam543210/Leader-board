import Queue from "bull";

export const submissionQueue = new Queue("submission-queue", {
  redis: {
    host: "127.0.0.1",
    port: 6379
  }
});
