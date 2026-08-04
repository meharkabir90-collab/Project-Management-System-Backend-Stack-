const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();

const dbConnect = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const workSpaceRoutes = require('./routes/workspaceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const swaggerSpec = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  explorer: true,
}

dbConnect();

const cors = require('cors');
app.use(cors({
  origin: [ 'http://localhost:5173',
  'https://project-management-system-stack.vercel.app/'
  ],
  credentials: true,


})
);



app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Project Management System Backend Running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log("authRoutes:", authRoutes);
// auth Routes
app.use('/api/auth', authRoutes);

//workspace Routes
app.use('/api/workspace', workSpaceRoutes);

//project Routes
app.use('/api/project', projectRoutes);

//Task Routes
app.use('/api/task', taskRoutes);

//Task Routes
app.use('/api/user', userRoutes);

//Dashboard Routes
app.use('/api/dashboard', dashboardRoutes);

//swagger documentation

app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);


app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);
