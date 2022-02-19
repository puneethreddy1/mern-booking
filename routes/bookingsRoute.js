const express = require("express")

const router = express.Router();
const Booking = require("../models/booking")
const Room = require("../models/room")
const stripe = require("stripe")('sk_test_51KUFaASG5FiKNT1rxfZJ9aPlhFZwdOwd1pJDrHP8oPJNIDPsulRfacSaKKYq9kg7CYVFSmbztQX5GdbJ2ygsDbed00X4MiE2s4')

const { v4: uuidv4 } = require('uuid');
router.post("/bookroom", async (req, res) => {
    const {
        room, userid,
        fromdate, todate, totalamount, totaldays, token

    } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const pay = await stripe.charges.create(
            {
                amount: totalamount * 100,
                customer: customer.id,
                currency: 'INR',
                receipt_email: token.email
            },
            {
                idempotencyKey: uuidv4()
            }
        )
        if (pay) {


            const newbooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate: moment(fromdate).format('DD-MM-YYY')
                , todate: moment(todate).format('DD-MM-YYY')
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
            await roomtemp.save()
            res.send('Booked Successfully')

            return res.status(400).json({ e })


        }



        res.send('successful payment')

    } catch (error) {
        console.log(error)
    }








});
router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid;
    colsole.log(userid)
    try {
        const bookings = await Booking.find({ userid: userid })
        return res.send(bookings)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;