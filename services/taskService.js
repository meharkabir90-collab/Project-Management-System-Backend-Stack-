const Task = require("../models/Task");
const Project = require("../models/Project");
const Workspace = require("../models/Workspace");
const User = require("../models/User");
const cloudinary  = require("../config/cloudinary");
const Joi = require("joi");


// =========================
// Create Task
// =========================
const createTask = async (taskData, userId) => {

    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().allow("").optional(),
        workspace: Joi.string().required(),
        project: Joi.string().required(),
        assignedTo: Joi.string().optional(),
        priority: Joi.string().valid("low", "medium", "high", "critical").optional(),
        status: Joi.string().valid("todo", "in-progress", "review", "done").optional(),
        dueDate: Joi.date().optional(),
        labels: Joi.array().items(Joi.string()).optional(),
        attachments: Joi.array().optional(),
        comments: Joi.array().optional()
    });

    const { error } = schema.validate(taskData);

    if (error) {
        throw error;
    }

    const {
        title,
        description,
        workspace,
        project,
        assignedTo,
        priority,
        status,
        dueDate,
        labels,
        attachments,
        comments
    } = taskData;

    // Check Workspace
    const existingWorkspace = await Workspace.findById(workspace);

    if (!existingWorkspace) {
        throw new Error("Workspace not found");
    }

    // Check Project
    const existingProject = await Project.findById(project);

    if (!existingProject) {
        throw new Error("Project not found");
    }

    // Check Project belongs to Workspace
    if (existingProject.workspace.toString() !== workspace) {
        throw new Error("Project does not belong to this workspace");
    }

    // Check Assigned User
    if (assignedTo) {

        const existingUser = await User.findById(assignedTo);

        if (!existingUser) {
            throw new Error("Assigned user not found");
        }

    }

    // Create Task
    const task = await Task.create({
        title,
        description,
        workspace,
        project,
        assignedTo,
        priority,
        status,
        dueDate,
        createdBy: userId,
        labels,
        attachments,
        comments
    });

    return task;
};

const uploadAttachment = async (taskId, file, userId) => {

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }



    const result = await cloudinary.uploader.upload(file.path, {
        folder: "task-attachments"
    });

    task.attachments.push({
        url: result.url,
        public_id: result.public_id,
        uploadedBy: userId
    });

    await task.save();

    return task;
};

// =========================
// Get All Tasks
// =========================
const getAllTasks = async () => {

    const tasks = await Task.find()
        .populate("workspace", "name")
        .populate("project", "name")
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

    return tasks;
};

// =========================
// Get Task By ID
// =========================
const getTaskById = async (taskId) => {

    const task = await Task.findById(taskId)
        .populate("workspace", "name")
        .populate("project", "name")
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
};

// =========================
// Update Task
// =========================
const updateTask = async (taskId, taskData) => {

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    Object.assign(task, taskData);

    await task.save();

    return task;
};

// =========================
// Delete Task
// =========================
const deleteTask = async (taskId) => {

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    await Task.findByIdAndDelete(taskId);

    return task;
};

module.exports = {
    createTask,
    getAllTasks,
    uploadAttachment,
    getTaskById,
    updateTask,
    deleteTask
};