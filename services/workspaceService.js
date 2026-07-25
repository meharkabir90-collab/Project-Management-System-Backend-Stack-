const Workspace = require("../models/Workspace");
const Joi = require("joi");
const User = require("../models/User");




  // ===================== //
  //  Create Workspace 
  // // ===================== 
 const createWorkspace = async (workspaceData, ownerId) =>
     { 
        // Validate Request 
        const schema = Joi.object({
          name: Joi.string().min(3).max(100).required(),
          description: Joi.string().allow("").optional(),
          logo: Joi.string().allow("").optional() 
        });
          const { error } = schema.validate(workspaceData);
           if (error) 
            { 
                throw error;
            }
             const { name, description, logo } = workspaceData;
              // Check if workspace already exists 
            const existingWorkspace = await Workspace.findOne({ name, owner: ownerId });
            
            if (existingWorkspace) { throw new Error("Workspace already exists");

             } 
        // Create Workspace
         const workspace = await Workspace.create({ name, description, logo, owner: ownerId, members: [ownerId] });
          return workspace;
     }; 
          
          // ========================= 
          // // Get All Workspaces 
          const getAllWorkspaces = async () => {
             const workspaces = await Workspace.find() 
          .populate("owner", "name email role") .populate("members", "name email role");
           return workspaces; 
        };
          
          
          // ========================= 
          // // Get Workspace By ID 
          // // ========================= 
        const getWorkspaceById = async (workspaceId) =>
            {
              const workspace = await Workspace.findById(workspaceId)
              .populate("owner", "name email role") .populate("members", "name email role");
                  if (!workspace) { 
                    throw new Error("Workspace not found"); 
                } 
                return workspace; }; 
                
                
        // ========================= 
        // Update Workspace 
        // ========================= 
        const updateWorkspace = async (workspaceId, workspaceData) =>
         {
          const workspace =
         await Workspace.findByIdAndUpdate( workspaceId, workspaceData, { new: true, runValidators: true } );
           if (!workspace)
             {
             throw new Error("Workspace not found");
             }
              return workspace;
             };
             
             
             // =========================
             // Delete Workspace
         // =========================
          
          const deleteWorkspace = async (workspaceId) =>
         {
         const workspace = await Workspace.findByIdAndDelete(workspaceId);
          if (!workspace) 
            {
             throw new Error("Workspace not found");

           }
            return workspace; 
        };

        // Add Member // =========================
         const addMember = async (workspaceId, userId) => {
            // Check workspace exists
             const workspace = await Workspace.findById(workspaceId);

             if (!workspace) {
                 throw new Error("Workspace not found"); 
            }

            // Check user exists
             const user = await User.findById(userId);
             console.log("User Found:", user);

            if (!user) { throw new Error("User not found");

             } 
        // Check if user is already a member
         if (workspace.members.includes(userId)) 
            {
                 throw new Error("User is already a member of this workspace"); 
            }
        
        // Add member
         workspace.members.push(userId);
        await workspace.save();
         return workspace; 
        };


        // Get Workspace Members //
        //  ========================= 
    const getWorkspaceMembers = async (workspaceId) =>
       {
         const workspace = await Workspace.findById(workspaceId) 
         .populate("members", "username name email role avatar");
          if (!workspace) {
             throw new Error("Workspace not found");

           } 
           return workspace.members;
        };


        // Remove member 
    const removeMember = async (workspaceId, userId) =>
     {
     const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
         throw new Error("Workspace not found");
         } 
         // Check member exists in workspace 
         if (!workspace.members.includes(userId))
            {
             throw new Error("User is not a member of this workspace");
            }
    
    workspace.members.pull(userId);
     await workspace.save();
      return workspace; 
    };

        
        
        
    module.exports = { createWorkspace, getAllWorkspaces,
         getWorkspaceById, updateWorkspace,
          deleteWorkspace,
        addMember, getWorkspaceMembers, removeMember
     };