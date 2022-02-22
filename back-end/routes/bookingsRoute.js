const express = require("express")
const moment = require("moment")
const router = express.Router();
const Booking = require("../models/booking")
const Room = require("../models/room")
const stripe = require("stripe")('sk_test_51KUFaASG5FiKNT1rxfZJ9aPlhFZwdOwd1pJDrHP8oPJNIDPsulRfacSaKKYq9kg7CYVFSmbztQX5GdbJ2ygsDbed00X4MiE2s4')
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {
    const {
        room, userid,
        fromdate, todate,
        totalamount,
        totaldays,
        token

    } = req.body;

    // try {
    //     const customer = await stripe.customers.create({
    //         email: token.email,
    //         source: token.id
    //     })
    //     const pay = await stripe.charges.create(
    //         {
    //             amount: totalamount * 100,
    //             customer: customer.id,
    //             currency: 'INR',
    //             receipt_email: token.email
    //         },
    //         {
    //             idempotencyKey: uuidv4()
    //         }
    //     )
    //pay
    const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: moment(fromdate).format('DD-MM-YYYY')
        , todate: moment(todate).format('DD-MM-YYYY')
        , totalamount, totaldays,
        transactionID: uuidv4()

    })
    const booking = await newbooking.save();

    const roomtemp = await Room.findOne({ _id: room._id })


    roomtemp.currentbookings.push({
        bookingid: booking._id, fromdate: moment(fromdate).format('DD-MM-YYYY'),
        todate: moment(todate).format('DD-MM-YYYY'),
        userid: userid,
        status: booking.status
    })
    console.log(userid)
    await roomtemp.save()
    res.send('Booked Successfully')



    // res.send('successful payment')

    // } catch (error) {
    //     console.log(error)
    // }

});
router.post("/getbookingsbyuserid/", async (req, res) => {
    const userid = req.body.userid;
    console.log(userid)
    try {
        const bookings = await Booking.find({ userid: userid })
        console.log(bookings)
        return res.send(bookings)
    } catch (error) {
        console.log(error)
    }
})

router.post("/cancelbooking", async (req, res) => {
    const { bookingid, roomid } = req.body;
    try {
        const bookingitem = await Booking.findOne({ _id: bookingid })
        bookingitem.status = 'cancelled';
        await bookingitem.save();
        const room = await Room.findOne({ _id: roomid })
        const bookings = room.currentbookings;
        const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
        room.currentbookings = temp
        await room.save();
        res.send('cancelled succe3ssfully')
    } catch (e) {
        return res.status(400).json({ message: e })
    }
})


module.exports = router;