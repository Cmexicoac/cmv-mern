const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
// Schema definition

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  rol: {
    type: String,
    enum: ["alumno", "profesor"],
    required: true,
  },

  nombre: {
    type: String,
    required: false,
  },

  matricula: {
    type: String,
    required: true,
    unique: true,
  },

  foto: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
