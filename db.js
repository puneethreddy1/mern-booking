const mongoose = require("mongoose")
const mongoURL = "mongodb://localhost:27017/mern-rooms";
// const mongoURL = "mongodb+srv://puneeth:puneeth2542@cluster0.zlq2r.mongodb.net/mern-rooms";
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection;
connection.on('error', () => {
    console.log("mongoDB connection failed")
})
connection.on('connected', () => {
    console.log("mongoDB connection successfull")
})

module.exports = mongoose;