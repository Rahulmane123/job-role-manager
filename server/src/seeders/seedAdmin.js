const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { adminName, adminEmail, adminPassword } = require("../config/env");

async function seedAdmin() {
  const existingUser = await User.findOne({ email: adminEmail.toLowerCase() });

  if (existingUser) {
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: adminName,
    email: adminEmail.toLowerCase(),
    password: hashedPassword
  });
}

module.exports = seedAdmin;
