import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init(
    {
        duration: 2000
    }
);

function Landingscreen() {
    return (
        <div className='row landing justify-content-center'>
            <div className='col-md- my-auto text-center' style={{ borderRight: '5px solid white' }}>
                <h2 data-aos='zoom-in' style={{ color: "white", fontSize: '130px' }}>DIVINE HOTELS</h2>
                <h1 data-aos='zoom-out' style={{ color: "white" }}>"Explore different hotels out in the country"</h1>
                <Link to='/home'>
                    <button className='btn landingbtn' style={{ color: "black" }}>
                        Getting Started
                    </button>
                </Link>
            </div>
        </div >
    )
}

export default Landingscreen