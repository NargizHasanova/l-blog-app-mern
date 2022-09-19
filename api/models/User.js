const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            // unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "https://www.pngitem.com/pimgs/m/557-5578368_empty-profile-picture-icon-hd-png-download.png",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);