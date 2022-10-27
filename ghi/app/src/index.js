import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
// import AllSales from './sales/lists/allsales';
// import SalesRepSales from './sales/lists/salesrepsales';
// import CustomerForm from './sales/forms/customer';
// import SalesRepForm from './sales/forms/salesperson';
import SalesRecordForm from './sales/forms/salesform';

// SERVICE IMPORTS
import Service from './service/servicesMain';
import TechForm from './service/forms/techForm';
import ServiceForm from './service/forms/serviceForm';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<<<<<<< HEAD
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
                        {/* <Route index element={<AllSales />} />
                        <Route path=":salesrepid" element={<SalesRepSales />} />
                        <Route path="customer/new" element={<CustomerForm />} />
                        <Route path="rep/new" element={<SalesRepForm />} /> */}
                        <Route path="record/new" element={<SalesRecordForm />} />
                    </Route>

                    <Route path="service" element={<Service />} >
                        <Route index element={<main><h3>BLANK INDEX PAGE FOR SERVICE</h3></main>} />
                        <Route path="appointment" element={<ServiceForm />} />
                        <Route path="technician" element={<TechForm />} />
                    </Route>

                    <Route path="*" element={<None />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>,
    root
);


function None(props) {
    // return for undefined path
    return (
        <div class="alert alert-dark m-5 text-center" role="alert">
            <h1>🙈🙈🙈</h1>
            <h3>nothing to see here!</h3>
            <p>broken link or something similar - please try another URL</p>
        </div>
    );
}
=======
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// async function loadSales() {
//     const response = await fetch('http://localhost:8090/api/sales/');
//     if (response.ok) {
//         const data = await response.json();
//         root.render(
//             <React.StrictMode>
//                 <App sales={data.sales} />
//             </React.StrictMode>
//         );
//     } else {
//         console.error(response);
//     }
// }
// loadSales();
>>>>>>> 01301d9690b72a6a1834d249a5fd8720df889768
