const mongoose = require("mongoose");

const anoncesShema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter your name"],
  },
  image: {
    type: String,
    required: [true, "enter your image"],
  },
  description: {
    type: String,
    required: [true, "enter your description"],
  },
  user: {
    type: String,
  },
});

const user = mongoose.model("anonces", anoncesShema);
module.exports = user;
