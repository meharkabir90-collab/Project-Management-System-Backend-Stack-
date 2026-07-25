const taskService = require('../services/taskService');

   

// =========================
// Create Task
// =========================
const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body, req.user.id);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const uploadAttachment = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const file = req.file;
        const userId = req.user.id;


        const task = await taskService.uploadAttachment(
            taskId,
            file,
            userId
        );

        res.status(200).json({
            success: true,
            message: "Attachment uploaded successfully",
            task
        });

    } catch (error) {
        next(error);
    }
};

// =========================
// Get All Tasks
// =========================
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks(req.query);

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Get Task By ID
// =========================
const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);

        res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Update Task
// =========================
const updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(
            req.params.id,
            req.body,
            req.user.id
            
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Delete Task
// =========================
const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createTask,
    uploadAttachment,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};