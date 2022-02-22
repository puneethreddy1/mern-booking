import React from 'react'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    function logout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/">Divine<span style={{ color: '#5AFF3D' }}>Hotels</span></a>
                <a className="nav-link" href="/home" style={{ color: '#5AFF3D' }}>Home</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-5">
                        {user ? (<>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                    {user.name}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="/profile">profile</a>
                                    <a class="dropdown-item" href="#" onClick={logout}>Logout</a>

                                </div>
                            </div>


                        </>) : (<>
                            <li class="nav-item active">
                                <a class="nav-link" href="/Login">Login </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Register">Register</a>
                            </li>
                        </>)}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar 