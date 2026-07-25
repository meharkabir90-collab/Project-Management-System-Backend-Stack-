const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getDashboard } = require("../controllers/dashboardController");

router.get("/",  authMiddleware, roleMiddleware("admin", "manager", "member"), getDashboard);

module.exports = router;

