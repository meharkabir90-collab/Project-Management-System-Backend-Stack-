const userService = require("../services/userService");

// =========================
// Get All Users
// =========================
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// Get User By ID
// =========================
const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// Update User
// =========================
const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// Update User Role
// =========================
const updateUserRole = async (req, res, next) => {
    try {
        const user = await userService.updateUserRole(
            req.params.id,
            req.body.role
        );

        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// Delete User
// =========================
const deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    updateUserRole,
    deleteUser
};