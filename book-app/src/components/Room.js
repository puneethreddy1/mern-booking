import React, { useState } from 'react'
import { Modal, Button, Carousel } from "react-bootstrap"
import { Link } from 'react-router-dom'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init(
    {
        duration: 1000
    }
);


function Room({ room, fromdate, todate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className='row bs' data-aos='fade-up'>
            <div className='col-md-4'>
                <img src={room.imgurl[0]} className='smallimg' alt="img" />

            </div>
            <div className='col-md-7'>
                <h1> {room.name}</h1>
                <b>
                    {" "}
                    <p>No Of People: {room.count}</p>
                    <p>Type :{room.type.toUpperCase()}</p>
                    <p>LOCATION:{room.location}</p>
                    <p style={{ backgroundcolor: 'blue' }} >price :₹{room.price}</p>
                </b>
                <div style={{ float: 'right' }}>
                    {(fromdate && todate) && (localStorage.getItem('currentUser')) && (
                        <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className='btn btn-primary m-2'>Book Now</button>
                        </Link>
                    )}

                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>

                </div>



            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Carousel data-aos='fade-down' prevLabel='' nextLabel='' >
                        {room.imgurl.map(url => {
                            return <Carousel.Item>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                    alt="First slide"
                                />
                                {/* <Carousel.Caption>
                                    <h5>First slide label</h5>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                        })}
                    </Carousel>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}

export default Room


