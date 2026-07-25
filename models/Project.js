const mongoose = require("mongoose");

const { Schema } = mongoose;

const projectSchema = new Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
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

    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    status: {
        type: String,
        enum: ["active", "completed", "archived"],
        default: "active"
    },

    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);