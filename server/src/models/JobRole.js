const mongoose = require("mongoose");

const jobRoleSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      required: true,
      enum: ["Junior", "Mid", "Senior", "Lead"]
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

jobRoleSchema.index({ jobTitle: 1, department: 1 }, { unique: true });

module.exports = mongoose.model("JobRole", jobRoleSchema);
