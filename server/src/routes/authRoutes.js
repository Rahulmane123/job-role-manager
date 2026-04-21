const express = require("express");
const { login, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { loginValidator } = require("../validators/authValidators");

const router = express.Router();

router.post("/login", loginValidator, validateRequest, login);
router.get("/me", authMiddleware, getProfile);

module.exports = router;
