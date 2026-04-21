const { body } = require("express-validator");

const jobRoleValidator = [
  body("jobTitle")
    .trim()
    .notEmpty()
    .withMessage("Job title is required."),
  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required."),
  body("level")
    .isIn(["Junior", "Mid", "Senior", "Lead"])
    .withMessage("Level must be Junior, Mid, Senior, or Lead."),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long.")
];

module.exports = {
  jobRoleValidator
};
