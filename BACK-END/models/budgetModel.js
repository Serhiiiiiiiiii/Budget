const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
    category: {
        type: String
    },
    limit: {
        type: Number,
        required: [true, "The limit is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    expirationDate: {
        type: Date,
        required: [true, 'Expiration date is required'],
    },
    userID: String
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;