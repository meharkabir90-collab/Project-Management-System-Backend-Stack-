const Workspace = require('../models/Workspace');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');


const getDashboard = async (userId) => {

    const totalWorkspaces = await Workspace.countDocuments();
    const totalAdmins = await User.countDocuments({
        role: "admin"});
    const totalManagers = await User.countDocuments({
        role: "manager"});
    const totalMembers = await User.countDocuments({
        role: "member"});


    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({
        status: "active" });
    const completedProjects = await Project.countDocuments({
        status: "completed"
    });
    const archivedProjects = await Project.countDocuments({
        status: "archived"
    });


    const totalTasks = await Task.countDocuments();
    const todoTasks = await Task.countDocuments({
        status: "todo" });
    const inprogressTasks = await Task.countDocuments({
        status: "in-progress"
    });
    const reviewTasks = await Task.countDocuments({
        status: "review"
    });
    const completedTasks = await Task.countDocuments({
        status: "done"
    });



    return {
    totalWorkspaces,
    totalAdmins,
    totalManagers,
    totalMembers, totalProjects, activeProjects, completedProjects, archivedProjects,
        totalTasks, todoTasks, inprogressTasks ,reviewTasks, completedTasks

    };


}

module.exports = { getDashboard };

