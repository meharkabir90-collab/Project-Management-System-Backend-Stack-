const workspaceService = require('../services/workspaceService');



// Create Workspace 
   const createWorkspace = async (req, res, next) =>
  { 
    try

     { 
      const workspace = await workspaceService.createWorkspace( req.body, req.user.id );
     res.status(201).json({ success: true,
         message: "Workspace created successfully",
          data: workspace }); 
    
    } 
    
    catch (error) { next(error); } 
   };
    
    // Get All Workspaces
     const getAllWorkspaces = async (req, res, next) => 
        {
         try
          {
             const workspaces = await workspaceService.getAllWorkspaces();
              res.status(200).json({ success: true,
                 data: workspaces });
          }
           catch (error) { next(error); } };
           
           
    // Get Workspace By ID 
    const getWorkspaceById = async (req, res, next) =>
     {
       try
        {
         const workspace = await workspaceService.getWorkspaceById(req.params.id);
          res.status(200).json({ success: true, data: workspace });
        }
        catch (error) { next(error);
      }
     }; 
     

     // Update Workspace 
     const updateWorkspace = async (req, res, next) =>
     {
      try
        {
        const workspace = await workspaceService.updateWorkspace( req.params.id, req.body );
        res.status(200).json({ success: true, message: "Workspace updated successfully",
             data: workspace });
        } 
        catch (error)
         {
             next(error); 
         } 
     };
             


    // Delete Workspace 
    const deleteWorkspace = async (req, res, next) =>
        {
             try {
                await workspaceService.deleteWorkspace(req.params.id);
               res.status(200).json({ success: true,
                 message: "Workspace deleted successfully" });
             } 
             catch (error)
            { 
                next(error); 
            }
        };


        // Add Member
       // =========================
      const addMember = async (req, res, next) =>
       {
         try
          {
           const workspace = await workspaceService.addMember( req.params.id, req.body.userId );
            res.status(200).json({ success: true,
               message: "Member added successfully",
               data: workspace });
            } 
            catch (error) { next(error);

          }
       }; // ========================= 
       //  Get Workspace Members  =========================
        const getWorkspaceMembers = async (req, res, next) =>
         { 
          try
           {
           const members = await workspaceService.getWorkspaceMembers( req.params.id );
            res.status(200).json({ success: true,
               data: members });
            }
             catch (error)
            {
               next(error);
               }
          }; 
          
          // ========================= 
          // Remove Member // =========================
       const removeMember = async (req, res, next) =>
         {
           try
           {
             const workspace = await workspaceService.removeMember( req.params.id, req.params.userId );
              res.status(200).json({ success: true,
                 message: "Member removed successfully",
                  data: workspace });
                 }
                  catch (error)
                   {
                     next(error); }
           };

        
 module.exports = { createWorkspace, getAllWorkspaces, getWorkspaceById, updateWorkspace, deleteWorkspace,
                   addMember, getWorkspaceMembers, removeMember
  };