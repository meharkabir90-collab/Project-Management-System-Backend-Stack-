const authService = require('../services/authService');


//register controller
const register = async (req, res, next) => {
  try {
     console.log("req.body:", req.body);
    console.log("headers:", req.headers["content-type"]);
    const user = await authService.register(req.body);
  
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};



//login controller
const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "LoggedIn successfully",
      token: result.token,
      data: result.user
    });

  } catch (error) {
    next(error);
  }
};

//logout controller
const logout = (req, res) => {

    res.status(200).json({
        success: true,
        message: "Logout Successful"
    });

};

module.exports = { register, login, logout };
