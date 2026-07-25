const User = require("../models/User");
const Joi = require("joi");

// =========================
// Get All Users
// =========================
const getAllUsers = async () => {

    const users = await User.find().select("-password");

    return users;
};

// =========================
// Get User By ID
// =========================
const getUserById = async (userId) => {

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

// =========================
// Update User
// =========================
const updateUser = async (userId, userData) => {

    const schema = Joi.object({
        username: Joi.string().min(3).max(30).optional(),
        name: Joi.string().min(3).max(100).optional(),
        email: Joi.string().email().optional(),
        avatar: Joi.string().allow("").optional()
    });

    const { error } = schema.validate(userData);

    if (error) {
        throw error;
    }

    const user = await User.findByIdAndUpdate(
        userId,
        userData,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

// =========================
// Update User Role
// =========================
const updateUserRole = async (userId, role) => {

    const schema = Joi.object({
        role: Joi.string()
            .valid("admin", "manager", "member")
            .required()
    });

    const { error } = schema.validate({ role });

    if (error) {
        throw error;
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.role = role;

    await user.save();

    return user;
};

// =========================
// Delete User
// =========================
const deleteUser = async (userId) => {

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    updateUserRole,
    deleteUser
};