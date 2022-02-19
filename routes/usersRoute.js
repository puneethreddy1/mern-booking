const express = require("express")
const router = express.Router();

const User = require('../models/user')


router.post("/register", async (req, res) => {
    const newuser = new User({ name: req.body.name, email: req.body.email, password: req.body.password })
    try {
        const use = await newuser.save()
        res.send("successful registeration")
    }
    catch (e) {
        return res.status(400).json({ message: e })

    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body


    try {
        const user = await User.findOne({ email: email, password: password })
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isadmin: user.isadmin,
                _id: user._id
            }
            res.send(temp)
        }
        else {
            return res.status(400).json("login failed")
        }

    }
    catch (e) {
        return res.status(400).json({ message: e })

    }
});

module.exports = router;