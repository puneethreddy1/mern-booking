import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import 'antd/dist/antd.min.css';
import moment from 'moment'
import { DatePicker, Space } from 'antd';
import Navbar from '../components/Navbar'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init(
    {
        duration: 1000
    }
);

const { RangePicker } = DatePicker

// document.body.style.backgroundColor = "yellow";
function Homescreen() {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState()
    const [error, seterror] = useState()
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [duprooms, setduprooms] = useState([]);
    const [srchkey, setsrchkey] = useState('');
    const [type, settype] = useState('all')
    useEffect(async () => {
        try {
            setloading(true)//loading screen
            const data = await (await axios.get('api/rooms/getallrooms')).data
            //console.log(data.rooms)
            setrooms(data.rooms)//api request
            setduprooms(data.rooms)
            //console.log(data.rooms)
            setloading(false)//loading screen ends
        }
        catch (error) {
            seterror(true)
            console.log(error)
            setloading(false)
        }
    }, [])


    function filterByDate(dates) {
        setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
        settodate(moment(dates[1]).format('DD-MM-YYYY'))
        var temprooms = []
        var aval = false;
        for (const room of duprooms) {
            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                        && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)) {
                        if (
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                        ) {
                            aval = true;

                        }
                    }

                }
            }
            if (aval == true || room.currentbookings.length == 0) temprooms.push(room)


        }
        setrooms(temprooms)

    }
    function filterByLocation() {

        const temprooms = duprooms.filter(room => room.location.toLowerCase().includes(srchkey.toLowerCase()))
        setrooms(temprooms)
    }
    function filterByType(e) {
        settype(e)
        if (e !== 'all') {
            const temprooms = duprooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
            setrooms(temprooms)
        } else setrooms(duprooms)
    }
    return (
        <div className='background'><Navbar />
            <div className=' container bs' style={{ backgroundColor: "white" }}>
                <div className="row mt-8 bs" >
                    <div className="col-md-3" >
                        <RangePicker format='DD-MM-YYYY' format='DD-MM-YYYY' onChange={filterByDate} />
                    </div>
                    <div className="col-md-5">
                        <input type="text" placeholder='Location' className='form-control'
                            onChange={(e) => {
                                setsrchkey(e.target.value)
                            }}
                            onKeyPress={filterByLocation}

                        />
                    </div>
                    <div className="col-md-3 ">
                        <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
                            <option value="all">All</option>
                            <option value="deluxe">deluxe</option>
                            <option value="non deluxe">non-deluxe</option>
                            <option value="premium">Premium</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>

                </div>



                <div className='row justify-content-center'>
                    {/* <h1>// not working
                    {rooms.length}
                </h1> */}
                    {loading ?
                        (<Loader />) :
                        (rooms.map(room => {
                            return <div className='col-md-9 mt-2'>
                                <Room room={room} fromdate={fromdate} todate={todate} />
                            </div>
                        }))
                    }
                </div>

            </div>
        </div>
    )
}

export default Homescreen;