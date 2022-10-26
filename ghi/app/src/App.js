import { Outlet } from 'react-router-dom';
import Nav from './Nav';


function App(props) {
    return (
        <>
        <Nav />
        <Outlet />
    </>
    );
}

export default App