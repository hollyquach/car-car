import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Inventory() {
    return (
        <>
            <h1 className="text-center">Inventory</h1>
            <nav className="navbar-light">
                <div class="container-fluid">
                    <ul className="nav nav-tabs justify-content-end flex-column flex-sm-row">
                        <li className="nav-item p-1">
                            <NavLink className="nav-link" aria-current="page" to="/inventory/manufacturers">Manufacturers</NavLink>
                        </li>
                        <li className="nav-item p-1">
                            <NavLink className="nav-link" aria-current="page" to="/inventory/models">Vehicle Models</NavLink>
                        </li>
                        <li className="nav-item p-1">
                            <NavLink className="nav-link" aria-current="page" to="/inventory/automobiles">Automobiles</NavLink>
                        </li>
                        <li className="nav-item dropdown p-1">
                            <NavLink className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                New
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="dropdown-item" to="/inventory/manufacturers/new">Manufacturer</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/inventory/models/new">Model</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/inventory/automobiles/new">Automobile</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

