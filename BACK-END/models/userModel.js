const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [20, "The name cannot exceed 20 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "The email already exists"]
    },
    password : {
        type: String,
        required: [true, "The password is required"],
    },
    role: {
        type: String, 
        default: "user"
    },
    userID: String
})

const User = mongoose.model("User", userSchema)

module.exports = User;