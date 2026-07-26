const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Project Management System  (Backend API Testing Live at Browser)",
            version: "1.0.0",
            description: "API documentation for Project Management System",
        },
        servers: [
            {
            url: "http://localhost:5000",
            },
            {
              url: "https://project-management-system-backend-stack-production.up.railway.app/",
              description: "Production",
            }
            
            
        ],

       components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  },

  schemas: {
    RegisterUser: {
      type: "object",
      required: ["username", "name", "email", "password", "confirmPassword"],
      properties: {
        username: {
          type: "string",
          example: "John Doe"
        },
          name: {
          type: "string",
          example: "John Doe"
        },
        email: {
          type: "string",
          example: "john@example.com"
        },
        password: {
          type: "string",
          example: "Password123"
        },
        confirmPassword: {
          type: "string",
          example: "Password123"
        }
      }
    },

    LoginUser: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "john@example.com"
        },
        password: {
          type: "string",
          format: "password",
          example: "Password123"
        }
      }
    },
    Workspace: {
      type: "object",
      required: ["name"],
     properties: {
      name: {
       type: "string",
       example: "Software Development Team"
      },
      description: {
      type: "string",
      example: "Workspace for Project Management System"
       }
     }
    },

  AddMember: {
  type: "object",
  required: ["userId"],
  properties: {
    userId: {
      type: "string",
      example: "6872c1f34f8c92d6f2b3a123"
    }
  }
},

Project: {
  type: "object",
  required: ["name", "desription"],
  properties: {
    name: {
      type: "string",
      example: "Project Management System"
    },
    description: {
      type: "string",
      example: "Backend development using MERN Stack"
    },
    workspace: {
      type: "string",
      example: "6872c1f34f8c92d6f2b3a123"
    },
    status: {
      type: "string",
      enum: ["active", "completed", "archived"],
      example: "active"
    },
    startDate: {
      type: "string",
      format: "date",
      example: "2026-07-23"
    },
    endDate: {
      type: "string",
      format: "date",
      example: "2026-08-30"
    }
  }
},

Task: {
  type: "object",
  required: ["title", "workspace", "project"],
  properties: {
    title: {
      type: "string",
      example: "Implement Login API"
    },
    description: {
      type: "string",
      example: "Develop authentication using JWT."
    },
     workspace: {
      type: "string",
      example: "6872c1f34f8c92d6f2b3a123"
    },
    project: {
      type: "string",
      example: "6872c1f34f8c92d6f2b3a123"
    },
  
    status: {
      type: "string",
      enum: ["todo", "in-progress", "review", "done"],
      example: "todo"
    },
    priority: {
      type: "string",
      enum: ["low", "medium", "high"],
      example: "medium"
    },
    dueDate: {
      type: "string",
      format: "date",
      example: "2026-08-15"
    },
  
    labels: {
  type: "array",
  items: {
    type: "string"
  },
  example: ["Frontend", "UI", "Urgent"]
},

  attachments: {
  type: "array",
  items: {
    type: "object",
    properties: {
      url: {
        type: "https://cloudinary.com"
      },
      public_id: {
        type: "string"
      },
      uploadedBy: {
        type: "string",
        example: "6872c1f34f8c92d6f2b3a456"
      }
    }
  }
},
	comments: {
  type: "array",
  items: {
    type: "object",
    properties: {
       user: {
        type: "string",
        example: "6872c1f34f8c92d6f2b3a456"
      },
      message: {
        type: "string"
      }
    }
  }
},

  }
}
    

  }
}

    },
    apis: ["./Routes/*.js"]




};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
