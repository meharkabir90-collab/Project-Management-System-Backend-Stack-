const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/multerMiddleware');
const {
    createTask,
    uploadAttachment,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");


/**
 * @swagger
 * /api/task/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/create", authMiddleware, roleMiddleware("admin", "manager"), createTask);

/**
 * @swagger
 * /api/task/:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */
router.get("/", authMiddleware, roleMiddleware("admin", "manager", "member"), getAllTasks);

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
router.get("/:id",  authMiddleware, roleMiddleware("admin", "manager", "member"), getTaskById);

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put( "/:id", authMiddleware, roleMiddleware("admin", "manager"), updateTask);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete( "/:id", authMiddleware, roleMiddleware("admin"), deleteTask);



/**
 * @swagger
 * /api/task/{id}/attachments:
 *   post:
 *     summary: Upload attachment to a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - attachment
 *             properties:
 *               attachment:
 *                 type: string
 *                 format: binary
 *                 description: Upload PDF, JPG, JPEG, or PNG file
 *     responses:
 *       200:
 *         description: Attachment uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Attachment uploaded successfully
 *       400:
 *         description: Invalid request or file upload failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/:id/attachments", authMiddleware, upload.single("attachment"),
 roleMiddleware("admin", "manager"),
 uploadAttachment,

);

module.exports = router;