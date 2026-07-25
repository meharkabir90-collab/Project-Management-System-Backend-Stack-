const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { 
    getAllUsers,
    getUserById,
    updateUser,
    updateUserRole,
    deleteUser
} = require('../controllers/userController');


router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

router.get("/:id", authMiddleware, roleMiddleware("admin", "manager"), getUserById);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateUser);

router.put("/:id/role", authMiddleware, roleMiddleware("admin"), updateUserRole);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

module.exports = router;