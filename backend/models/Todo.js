const mongoose = require("mongoose");

const TODOSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  status: {
    type: String,
    enum: ["INPROGRESS", "COMPLETED", "PENDING"],
    required: true,
    default: "PENDING",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TODO", TODOSchema);
