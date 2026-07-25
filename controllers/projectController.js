const projectService = require("../services/projectService");

// =========================
// Create Project
// =========================
const createProject = async (req, res, next) => {
    try {
        const project = await projectService.createProject(
            req.body,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// Get All Projects
// =========================
const getAllProjects = async (req, res, next) => {
    try {
        const projects = await projectService.getAllProjects();

        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// Get Project By ID
// =========================
const getProjectById = async (req, res, next) => {
    try {
        const project = await projectService.getProjectById(req.params.id);

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// Update Project
// =========================
const updateProject = async (req, res, next) => {
    try {
        const project = await projectService.updateProject(
            req.params.id,
            req.body,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// Delete Project
// =========================
const deleteProject = async (req, res, next) => {
    try {
        const project = await projectService.deleteProject(req.params.id);

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};