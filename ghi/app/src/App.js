import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import CustomerForm from './sales/forms/customer'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/customer" element={<CustomerForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
