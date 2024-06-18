const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    disliked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = { User };
