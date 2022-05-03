import logo from './logo.svg';
import './animista.css';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import {loginData } from './Store';
import { useSelector } from 'react-redux';
import './App.css';
import React from 'react';
import Tutorial from './Tutorial';
import useMediaQuery from 'use-mediaquery';

function App() {

    const username = useSelector((state) =>  state.username );
    const password = useSelector((state) => state.password);
    const isPC = useMediaQuery("(min-width:450px)");


    if (isPC) {
        return <div style={{minWidth:window.innerWidth, minHeight:window.innerHeight}} className="w3-black w3-center w3-jumbo dancingFont"><br/><br/> This application is only for Mobiles. Try switching to Mobile Layout...<br/><br/> Thank You... </div>;
    }




    return (<>
        <Routes>


            <Route path="/" element={ <Login/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/tutorial" element={<Tutorial />} />
</Routes>
 </> );
}

export default App;
