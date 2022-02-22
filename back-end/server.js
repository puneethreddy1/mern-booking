const express = require("express")
const app = express();
const dbconfig = require('./db')
const usersRoute = require('./routes/usersRoute')

const roomsRoute = require('./routes/roomsRoute')

const bookingsRoute = require('./routes/bookingsRoute')

app.use(express.json())
app.use('/api/rooms', roomsRoute)// check fr "/"
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)
app.listen(5000, function () {
    console.log("server started running")
}) 
