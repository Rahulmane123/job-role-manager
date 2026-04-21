const mongoose = require("mongoose");
const JobRole = require("../models/JobRole");

function buildQuery(search, department) {
  const query = {};

  if (search) {
    query.$or = [
      { jobTitle: { $regex: search, $options: "i" } },
      { department: { $regex: search, $options: "i" } }
    ];
  }

  if (department) {
    query.department = { $regex: `^${department}$`, $options: "i" };
  }

  return query;
}

async function getJobRoles(req, res, next) {
  try {
    const { search = "", department = "", sort = "desc" } = req.query;
    const sortOrder = sort === "asc" ? 1 : -1;
    const query = buildQuery(search, department);

    const jobRoles = await JobRole.find(query).sort({ createdAt: sortOrder });

    return res.json({ jobRoles });
  } catch (error) {
    return next(error);
  }
}

async function createJobRole(req, res, next) {
  try {
    const existingRole = await JobRole.findOne({
      jobTitle: req.body.jobTitle,
      department: req.body.department
    });

    if (existingRole) {
      return res.status(409).json({
        message: "A job role with this title already exists in the selected department."
      });
    }

    const jobRole = await JobRole.create(req.body);
    return res.status(201).json({
      message: "Job role created successfully.",
      jobRole
    });
  } catch (error) {
    return next(error);
  }
}

async function updateJobRole(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job role id." });
    }

    const duplicateRole = await JobRole.findOne({
      _id: { $ne: id },
      jobTitle: req.body.jobTitle,
      department: req.body.department
    });

    if (duplicateRole) {
      return res.status(409).json({
        message: "A job role with this title already exists in the selected department."
      });
    }

    const jobRole = await JobRole.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!jobRole) {
      return res.status(404).json({ message: "Job role not found." });
    }

    return res.json({
      message: "Job role updated successfully.",
      jobRole
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteJobRole(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job role id." });
    }

    const jobRole = await JobRole.findByIdAndDelete(id);

    if (!jobRole) {
      return res.status(404).json({ message: "Job role not found." });
    }

    return res.json({ message: "Job role deleted successfully." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getJobRoles,
  createJobRole,
  updateJobRole,
  deleteJobRole
};
