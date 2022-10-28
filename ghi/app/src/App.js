import { Outlet } from 'react-router-dom';
import Nav from './Nav';

function App(props) {
  return (
    <>
      <Nav />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default App
