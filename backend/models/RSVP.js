const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")

const RSVPSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
    },
    domain:{
      type:String,
      required:true,
    },
    message:{
        type:String
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("RSVP", RSVPSchema);
