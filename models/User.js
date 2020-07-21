const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        data: Buffer,
        contentType: String,
    },
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    approvedBy: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
