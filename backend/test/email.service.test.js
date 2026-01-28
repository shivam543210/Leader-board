import test from "node:test";
import assert from "node:assert";
import { sendWelcomeEmail } from "../src/services/email.Service.js";
import { emailQueue } from "../src/queue/email.queue.js";

test("should push job in the queue", async () => {
  const user = {
    email: "test@example.com",
    name: "Saumy",
  };

  // spy variables
  let called = false;
  let receivedData = null;

  // mock
  emailQueue.add = async function (name_of_job , data) {
    called = true;
    receivedData = data;
  };

  await sendWelcomeEmail(user);

  // assertions
  assert.equal(called, true);
  assert.deepStrictEqual(receivedData, {
    email: "test@example.com",
    name: "Saumy",
  });
});
