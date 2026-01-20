import "dotenv/config";
import app from "./app.js";
import prisma from "./config/prisma.js";

const port = process.env.PORT || 5000;

// 🔹 DB connect (optional but fine)

// 🔹 Start HTTP server (THIS keeps Node alive)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
