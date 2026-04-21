// const app = require("./app");
// const connectDatabase = require("./config/db");
// const { port } = require("./config/env");
// const seedAdmin = require("./seeders/seedAdmin");
// const seedJobRoles = require("./seeders/seedJobRoles");

// async function startServer() {
//   try {
//     await connectDatabase();
//     await seedAdmin();
//     await seedJobRoles();
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//     process.exit(1);
//   }
// }

// startServer();
require('dotenv').config(); // 👈 ye missing tha

const app = require("./app");
const connectDatabase = require("./config/db");
const { port } = require("./config/env");
const seedAdmin = require("./seeders/seedAdmin");
const seedJobRoles = require("./seeders/seedJobRoles");

async function startServer() {
  try {
    await connectDatabase();
    await seedAdmin();
    await seedJobRoles();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();