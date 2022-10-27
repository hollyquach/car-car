import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Service() {
    return (
        <>
            <h1 className="text-center">Service</h1>
                <nav className="navbar-light">
                    <div class="container-fluid">
                        <ul className="nav nav-tabs justify-content-end flex-column flex-sm-row">
                            <li className="nav-item p-2">
                                <NavLink className="nav-link" aria-current="page" to="/service">Service Appointments</NavLink>
                            </li>
                            <li className="nav-item dropdown p-2">
                                <NavLink className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    New
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" to="/service/appointment/new">Appointment</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/service/technician/new">Technician</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            <Outlet />
        </>
    )

}