import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader'
import Error from '../components/Error'


const { TabPane } = Tabs;


function Profilescreen() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    //console.log(user._id);


    useEffect(() => {
        if (!user) window.location.href = '/login'
    }, [])

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="profile" key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name :{user.name.toUpperCase()}</h1>
                    <h1>Email:{user.email}</h1>

                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>

            </Tabs>

        </div>
    )
}

export default Profilescreen



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [book, setbook] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    useEffect(async () => {
        setloading(true)
        try {
            const data = await (await axios.post('/api/bookings/getbookingsbyuserid/', { userid: user._id })).data
            setbook(data)
            console.log(data)


            setloading(false)
        } catch (error) {

            console.log(error)
            setloading(false)
            seterror(error)
        }
    }, [])
    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true);
            const result = (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result)
            setloading(false)
            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && (<Loader />)}
                    {book && (book.map(booking => {
                        return <div className="bs">
                            <p>{booking.room}</p>
                            <p><b>BookingId</b> :{booking._id}</p>
                            <p><b>Start</b>:{booking.fromdate}</p>
                            <p><b>End</b>:{booking.todate}</p>
                            <p><b>Amount</b>:{booking.totalamount}</p>
                            <p><b>Status</b>:{booking.status == 'booked' ? 'confirmed' : 'cancelled'}</p>
                            <div className="text-right">
                                <button className="btn btn-primary" onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL</button>

                            </div>
                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}

