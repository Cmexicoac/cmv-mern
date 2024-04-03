const mongoose = require("mongoose");
const User = require("./User.js");
const Group = require("./Group.js"); // import the Group model

const TeacherSchema = User.discriminator(
  "Teacher",
  new mongoose.Schema({
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  })
);

module.exports = TeacherSchema;
