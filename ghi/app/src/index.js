import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import App from './App';
import MainPage from './MainPage';

// INVENTORY IMPORTS
import Inventory from './inventory/inventoryMain';
import Manufacturers from './inventory/lists/manufacturers';
import MfgForm from './inventory/forms/manufacturerForm';
import VehicleModels from './inventory/lists/vehiclemodels'
import VehicleModelForm from './inventory/forms/vehicle';
import Automobiles from './inventory/lists/vehiclemodels'
import AutomobileForm from './inventory/forms/automobileForm';

// SALES IMPORTS
import Sales from './sales/salesMain';
import SalesList from './sales/lists/allsales';
// import SalesRepSales from './sales/lists/salesrepsales';
import CustomerForm from './sales/forms/customer';
import SalesRepForm from './sales/forms/salesrep';
import SalesForm from './sales/forms/sales';

// SERVICE IMPORTS
import Service from './service/servicesMain';
import TechForm from './service/forms/techForm';
import ServiceForm from './service/forms/serviceForm';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <div className="container">
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<MainPage />} />

                    <Route path="inventory" element={<Inventory />} >
                        <Route index element={<main><h3>BLANK INDEX PAGE FOR INVENTORY</h3></main>} />
                        <Route path="manufacturers" element={<Manufacturers />} />
                        <Route path="manufacturers/new" element={<MfgForm />} />
                        <Route path="models" element={<VehicleModels />} />
                        <Route path="models/new" element={<VehicleModelForm />} />
                        <Route path="automobiles" element={<Automobiles />} />
                        <Route path="automobiles/new" element={<AutomobileForm />} />
                    </Route>

                    <Route path="sales" element={<Sales />} >
                        <Route index element={<SalesList />} />
                        {/* <Route path=":salesrepid" element={<SalesRepSales />} /> */}
                        <Route path="customer/new" element={<CustomerForm />} />
                        <Route path="rep/new" element={<SalesRepForm />} />
                        <Route path="record/new" element={<SalesForm />} />
                    </Route>

                    <Route path="service" element={<Service />} >
                        <Route index element={<main><h3>BLANK INDEX PAGE FOR SERVICE</h3></main>} />
                        <Route path="appointment/new" element={<ServiceForm />} />
                        <Route path="technician/new" element={<TechForm />} />
                    </Route>
                    <Route path="*" element={<None />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
);


function None(props) {
    const navigate = useNavigate();
    // return for undefined path
    return (
        <div class="alert alert-dark m-5 text-center" role="alert">
            <h1>🙈🙈🙈</h1>
            <h3>nothing to see here!</h3>
            <p>broken link or something similar - please try another URL</p>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Go back</button>
        </div>
    );
}
