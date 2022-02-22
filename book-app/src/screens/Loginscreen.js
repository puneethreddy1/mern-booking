import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Success from '../components/Success'
import Error from '../components/Error';
import { set } from 'mongoose';
import Navbar from '../components/Navbar';
function Loginscreen() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [success, setsuccess] = useState()

    async function Login() {

        const user = {

            email, password
        }
        try {
            setloading(true)
            const result = (await axios.post('/api/users/login', user)).data
            setloading(false)
            //console.log(result)
            localStorage.setItem('currentUser', JSON.stringify(result))
            window.location.href = '/home'



        }
        catch (e) {

            console.log(e)
            setloading(false)
            seterror(true)
        }

    }


    return (

        <div className="">
            <Navbar />
            <div>
                {loading && (<Loader />)}

                <div className="row justify-content-center mt-5 ">
                    <div className="col-md-5 ">

                        {error && (<Error message="invalid credintials" />)}
                        <div className='bs'>
                            <h2>Login</h2>

                            <input type="text" className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                            <input type="password" className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />


                            <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
    return false;
}

export default Loginscreen