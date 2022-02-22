const mongoose = require("mongoose")

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    imgurl: [],
    currentbookings: [],
    type: {
        type: String,
        required: true

    },
    description: {
        type: String
    }
}, {
    timestamps: true,
})
const roomModel = mongoose.model("rooms", roomSchema);


// const room1 = new Room({
//     name: "big bedroom",
//     count: 4,
//     price: 3500,
//     location: "hyderabad",
//     type: "deluxe"
// })
//room1.save();
module.exports = roomModel;