const Project = require('../models/Project');
const Workspace = require("../models/Workspace");
const Joi = require("joi");


// =========================
// Create Project
// =========================
const createProject = async (projectData, userId) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        description: Joi.string().allow("").optional(),
        workspace: Joi.string().required(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional()
    });

    const { error } = schema.validate(projectData);

    if (error) {
        throw error;
    }

    const {
        name,
        description,
        workspace,
        startDate,
        endDate
    } = projectData;

    // Check workspace exists
    const existingWorkspace = await Workspace.findById(workspace);

    if (!existingWorkspace) {
        throw new Error("Workspace not found");
    }

    // Check duplicate project
    const existingProject = await Project.findOne({
        name,
        workspace
    });

    if (existingProject) {
        throw new Error("Project already exists");
    }

    // Create project
    const project = await Project.create({
        name,
        description,
        workspace,
        createdBy: userId,
        members: [userId],
        startDate,
        endDate
    });

    return project;
};

// =========================
// Get All Projects
// =========================
const getAllProjects = async () => {

    const projects = await Project.find()
        .populate("workspace", "name")
        .populate("createdBy", "name email role")
        .populate("members", "name email role");

    return projects;
};

// =========================
// Get Project By ID
// =========================
const getProjectById = async (projectId) => {

    const project = await Project.findById(projectId)
        .populate("workspace", "name")
        .populate("createdBy", "name email role")
        .populate("members", "name email role");

    if (!project) {
        throw new Error("Project not found");
    }

    return project;
};

// =========================
// Update Project
// =========================
const updateProject = async (projectId, projectData, userId) => {

    const project = await Project.findByIdAndUpdate(
        projectId,
        projectData,
        userId,
        {
            new: true,
            runValidators: true
        }
    );

    if (!project) {
        throw new Error("Project not found");
    }

    return project;
};

// =========================
// Delete Project
// =========================
const deleteProject = async (projectId) => {

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
        throw new Error("Project not found");
    }

    return project;
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};