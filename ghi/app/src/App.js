import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import CustomerForm from './sales/forms/customer'
import SalesForm from './sales/forms/sales'
import SalesRepForm from './sales/forms/salesrep'
import VehicleForm from './inventory/forms/vehicle';
import SalesList from './sales/lists/allsales';
import SalesRepSalesList from './sales/lists/salesrepsales';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/customer" element={<CustomerForm />} />
          {/* delete this */}
          <Route path="/sales" element={<SalesForm />} />
          <Route path="/sales_rep" element={<SalesRepForm />} />
          <Route path="/vehicle" element={<VehicleForm />} />
          <Route path="/allsales" element={<SalesList />} />
          <Route path="/salesrepsales" element={<SalesRepSalesList />} />
          {/* end delete */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
