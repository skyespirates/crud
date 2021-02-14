const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({ username: String, age: Number });

module.exports = mongoose.model("User", userSchema);
