const dashboardService = require('../services/dashboardService');


const getDashboard = async (req, res, next) => {

    try {
        const dashboard = await dashboardService.getDashboard(req.user.id);

        res.status(200).json({
        success: true,
        dashboard
        });



    } catch (error) {
        next(error)
    }
    


};


module.exports = { getDashboard };