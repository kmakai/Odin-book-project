const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: [true, "A name is required for the user"] },
  email: {
    type: String,
    require: [true, "A email is required for the user"],
    unique: true,
  },
  photo: { type: String },
  password: {
    type: String,
    required: [true, "A password is required for the user"],
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
