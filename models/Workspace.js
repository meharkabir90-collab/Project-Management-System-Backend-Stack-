const mongoose = require("mongoose");

const { Schema } = mongoose;

const workspaceSchema = new Schema(
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

    logo: {
      type: String,
      default: ""
    },

    owner: {
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

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Workspace", workspaceSchema);