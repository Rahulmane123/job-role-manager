const express = require("express");
const {
  getJobRoles,
  createJobRole,
  updateJobRole,
  deleteJobRole
} = require("../controllers/jobRoleController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { jobRoleValidator } = require("../validators/jobRoleValidators");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getJobRoles);
router.post("/", jobRoleValidator, validateRequest, createJobRole);
router.put("/:id", jobRoleValidator, validateRequest, updateJobRole);
router.delete("/:id", deleteJobRole);

module.exports = router;
