const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const {
  createWorkspace,
   getAllWorkspaces,
    getWorkspaceById,
     updateWorkspace,
      deleteWorkspace, 
      addMember, getWorkspaceMembers, removeMember
} = require("../controllers/workspaceController");

/**
 * @swagger
 * tags:
 *   name: Workspaces
 *   description: Workspace management APIs
 */



/**
 * @swagger
 * /api/workspace/create:
 *   post:
 *     summary: Create a new workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workspace'
 *     responses:
 *       201:
 *         description: Workspace created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/create", authMiddleware, roleMiddleware("admin"), createWorkspace);

/**
 * @swagger
 * /api/workspace/:
 *   get:
 *     summary: Get all workspaces
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workspaces retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, roleMiddleware("admin", "member"), getAllWorkspaces);

/**
 * @swagger
 * /api/workspace/{id}:
 *   get:
 *     summary: Get workspace by ID
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workspace ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workspace retrieved successfully
 *       404:
 *         description: Workspace not found
 */
router.get("/:id",  authMiddleware, roleMiddleware("admin", "member"), getWorkspaceById);

/**
 * @swagger
 * /api/workspace/{id}:
 *   put:
 *     summary: Update workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workspace ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workspace'
 *     responses:
 *       200:
 *         description: Workspace updated successfully
 *       404:
 *         description: Workspace not found
 */
router.put( "/:id", authMiddleware, roleMiddleware("admin"), updateWorkspace );

/**
 * @swagger
 * /api/workspace/{id}:
 *   delete:
 *     summary: Delete workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workspace ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workspace deleted successfully
 *       404:
 *         description: Workspace not found
 */
router.delete( "/:id", authMiddleware, roleMiddleware("admin"), deleteWorkspace );

//create,get,delete members in workspace
/**
 * @swagger
 * /api/workspace/{id}/members:
 *   post:
 *     summary: Add a member to a workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workspace ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMember'
 *     responses:
 *       200:
 *         description: Member added successfully
 *       404:
 *         description: Workspace or user not found
 */
router.post("/:id/members", authMiddleware, roleMiddleware("admin"), addMember);

/**
 * @swagger
 * /api/workspace/{id}/members:
 *   get:
 *     summary: Get all members of a workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workspace ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Members retrieved successfully
 *       404:
 *         description: Workspace not found
 */
router.get("/:id/members", authMiddleware, roleMiddleware("admin", "member"), getWorkspaceMembers);

/**
 * @swagger
 * /api/workspace/{id}/member/{userId}:
 *   delete:
 *     summary: Remove a member from a workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workspace ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       404:
 *         description: Workspace or user not found
 */
router.delete("/:id/members/:userId", authMiddleware, roleMiddleware("admin"), removeMember);

module.exports = router;