const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//register
const register = async (userData) => {

 try {
      
    // 1️⃣ Validate incoming request
    const schema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
      avatar: Joi.string().uri().allow("").optional(),
      isVerified: Joi.boolean().default(false)
    });

    const { error } = schema.validate(userData);
    if (error) {
    throw error;
    }

    const { username, name, email, password } = userData;

    // 1. Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCount = await User.countDocuments();
         console.log("User Count:", userCount);

    
 
    

    let role = "member";
     
     if (userCount <= 1) {
        role = "admin";
     }

     console.log("Assigned Role:", role);

     // 3. Create user
    const user = await User.create({
        username,
        name,
        email,
        password: hashedPassword,
        role
        
    });
    console.log("Saved Role:", user.role);

    return user;


    
  } catch (err) {
    console.error('Register error:', err);
    throw err;
  };

   
};



//login
const login = async ({ email, password }) => {

 try {
    // 1️⃣ Validate request body
    const schema = Joi.object({
      email: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern).required()
    });

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10d"
        }
    );

    return {
        token,
        user
    };

 } catch (err) {
    console.error('Login error:', err);
    throw err;
  }

};

module.exports = { register, login };