const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  name: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  timestamps: String
});


const User = model("User", userSchema);

module.exports = User;
