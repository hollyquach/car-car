import { Outlet } from 'react-router-dom';
import Nav from './Nav';

import CustomerForm from './sales/forms/customer'
import SalesForm from './sales/forms/sales'
import SalesRepForm from './sales/forms/salesrep'
import VehicleForm from './inventory/forms/vehicle';

function App(props) {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App
