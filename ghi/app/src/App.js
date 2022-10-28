import { Outlet } from 'react-router-dom';
import Nav from './Nav';

import CustomerForm from './sales/forms/customer'
import SalesForm from './sales/forms/sales'
import SalesRepForm from './sales/forms/salesrep'
import VehicleForm from './inventory/forms/vehicle';
import SalesList from './sales/lists/allsales';
import SalesRepSalesList from './sales/lists/salesrepsales';
import AutomobilesList from './inventory/lists/automobiles';
import VehicleList from './inventory/lists/vehiclemodels';

function App(props) {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App
