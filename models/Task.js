const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    workspace: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    status: {
        type: String,
        enum: ["todo", "in-progress", "review", "done"],
        default: "todo"
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium"
    },

    startDate: {
        type: Date
    },

    dueDate: {
        type: Date
    },

    labels: [
        {
            type: String,
            trim: true
        }
    ],

    attachments: [
        {
            url: String,
            public_id: String,
            uploadedBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },

            message: {
                type: String,
                required: true
            },

            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    isDeleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);