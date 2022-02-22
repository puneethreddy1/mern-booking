import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import { useParams } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from '../components/Navbar'
AOS.init(
    {
        duration: 1000
    }
);


function Bookingscreen({ match }) {
    const par = useParams();//it has      room_id,fromdate ,todate
    //console.log(par)
    const roomid = par.roomid;
    const fromdate = moment(par.fromdate, 'DD-MM-YYYY')
    const todate = moment(par.todate, 'DD-MM-YYYY')
    const [room, setroom] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [totalamount, settotalamount] = useState()
    const totaldays = moment(moment.duration(todate.diff(fromdate)).asDays()) + 1;
    // console.log(totaldays)
    // console.log(fromdate)
    var yt = {};
    useEffect(async () => {
        try {
            setloading(true)//loading screen

            const data = await (await axios.post('/api/rooms/getroombyid', {//api request
                roomid: par.id,
            })).data;
            settotalamount((data.rooms.price) * totaldays);
            //console.log(totalamount)
            setroom(data.rooms)
            console.log(data);
            yt = data.rooms;

            setloading(false)//loading screen ends
        }
        catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
        }
    }, [])
    // async function bookRoom() {
    //     const bookingDetails = {
    //         room,
    //         user: JSON.parse(localStorage.getItem('currentUser'))._id,
    //         fromdate,
    //         todate,
    //         totalamount,
    //         totaldays

    //     }
    //     try {
    //         const result = await axios.post('/api/bookings/bookroom', bookingDetails);

    //     }
    //     catch (e) {

    //     }
    // }
    async function onToken(token) {
        console.log(token)
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token


        }
        try {
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);

        }
        catch (e) {

        }

    }


    return (
        // <h1>room id={par.roomid}</h1>

        <div>
            <Navbar />
            <div className='m-5' data-aos='flip-left' >


                {loading ? (<Loader />) : room ?
                    (<div>

                        <div className='row justify-content-center mt-5 bs' >
                            <div className="col-md-5">
                                <h1>{room.name}</h1>
                                <img src={__dirname + room.imgurl[0]} className='bigimg' />

                            </div>
                            <div className="col-md-5">
                                <div style={{ textAlign: "right" }}>
                                    <h1>Booking Details</h1>
                                    <hr />
                                    <b>
                                        <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                        <p>From:{par.fromdate}</p>
                                        <p>To:{par.todate}</p>
                                        <p>people:{room.count}</p>
                                        <p></p>

                                    </b>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <b>
                                        <h1>Amount:{totalamount}</h1>
                                        <hr />
                                        <p>Total Days:{totaldays}</p>
                                        <p>Rent per Day:{room.price}</p>
                                        <p>Total Amount:{totalamount}</p>
                                    </b>
                                </div>
                                <div style={{ float: "right" }}>

                                    <StripeCheckout
                                        amount={totalamount * 100}
                                        token={onToken}
                                        currency='INR'
                                        stripeKey="pk_test_51KUFaASG5FiKNT1rOnBBlYvlINWb7t9gSz2UTSwDoQ51qNxcB4iF3Ih0sfQ4dqY6N2AMhW9EI9NRqlv5KHkAiP2n00OkI2HLw7"
                                    >
                                        <button className='btn btn-primary'>Pay Now</button>
                                    </StripeCheckout>

                                </div>
                            </div>




                        </div>


                    </div>) : (<Error />)


                }


            </div>
        </div>
    );
}

export default Bookingscreen;