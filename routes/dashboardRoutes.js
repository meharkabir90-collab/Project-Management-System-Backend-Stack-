const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getDashboard } = require("../controllers/dashboardController");


/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Returns overall statistics for workspaces, projects, tasks, and users.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 dashboard:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                       example: 15
 *                     totalWorkspaces:
 *                       type: integer
 *                       example: 4
 *                     totalProjects:
 *                       type: integer
 *                       example: 12
 *                     totalTasks:
 *                       type: integer
 *                       example: 150
 *                     completedTasks:
 *                       type: integer
 *                       example: 98
 *                     pendingTasks:
 *                       type: integer
 *                       example: 52
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       500:
 *         description: Internal Server Error
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "manager"),
    getDashboard
);
router.get("/",  authMiddleware, roleMiddleware("admin", "manager", "member"), getDashboard);

module.exports = router;

