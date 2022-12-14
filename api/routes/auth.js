const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt");


// REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            profilePic: req.body.profilePic
        })
        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err.message)
    }
})



// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            return res.status(400).json("wrong username!")
        }
        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) {
            return res.status(400).json("wrong password")
        }

        const { password, ...others } = user._doc; // bunu hashed passworda gore yazillar
        return res.status(200).json(others)

    } catch (err) {
        return res.status(500).json(err.message)
    }
})


module.exports = router;

