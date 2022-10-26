import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Sales() {
    return (
        <>
            <h1>Sales</h1>
            <nav className="navbar">
                <div class="container-fluid">
                    <ul className="nav nav-tabs justify-content-end flex-column flex-sm-row">
                        <li className="nav-item p-2">
                            <NavLink className="nav-link" aria-current="page" to="/sales">Sales Records</NavLink>
                        </li>
                        <li className="nav-item p-2">
                            <NavLink className="nav-link" aria-current="page" to="/sales/:salesrepid">Sales by Rep</NavLink>
                        </li>
                        <li className="nav-item dropdown p-2">
                            <NavLink className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                New
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="dropdown-item" to="/sales/record/new">Sales Record</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/sales/customer/new">Customer</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/sales/rep/new">Sales Rep</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}