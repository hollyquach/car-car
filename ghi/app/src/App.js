import { Outlet } from 'react-router-dom';
import Nav from './Nav';

import CustomerForm from './sales/forms/customer'
import SalesForm from './sales/forms/sales'
import SalesRepForm from './sales/forms/salesrep'
import VehicleForm from './inventory/forms/vehicle';
import SalesList from './sales/lists/allsales';

function App(props) {
  return (
    <>
      <Nav />
<<<<<<< HEAD
      <Outlet />
    </>
=======
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/customer" element={<CustomerForm />} />
          {/* delete this */}
          <Route path="/sales" element={<SalesForm />} />
          <Route path="/sales_rep" element={<SalesRepForm />} />
          <Route path="/vehicle" element={<VehicleForm />} />
          <Route path="/allsales" element={<SalesList />} />
          {/* end delete */}
        </Routes>
      </div>
    </BrowserRouter>
>>>>>>> 01301d9690b72a6a1834d249a5fd8720df889768
  );
}

export default App
