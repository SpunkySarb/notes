import logo from './logo.svg';
import './animista.css';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import {loginData } from './Store';
import {useSelector } from 'react-redux';


function App() {

    const username = useSelector((state) =>  state.username );
    const password = useSelector((state) => state.password);

    
    return (<>
        <Routes>


            <Route path="/" element={ <Login/>}/>
            <Route path="/home" element={<Home />} />
</Routes>
 </> );
}

export default App;
