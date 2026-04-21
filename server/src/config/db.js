const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectDatabase() {
  await mongoose.connect(mongoUri);
}

module.exports = connectDatabase;
