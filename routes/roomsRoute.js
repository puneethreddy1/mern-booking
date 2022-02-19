const express = require("express")
const router = express.Router();

const Room = require('../models/room')

router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({})
        return res.json({ rooms })
    }
    catch (e) {
        return res.status(400).json({ message: e })

    }
});

router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;

    try {
        const rooms = await Room.findOne({ _id: roomid })
        return res.json({ rooms })
    }
    catch (e) {
        return res.status(400).json({ message: e })

    }
});


module.exports = router;