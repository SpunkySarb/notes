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
import TutorialPC from './TutorialPC';
import useMediaQuery from 'use-mediaquery';

function App() {

    const username = useSelector((state) =>  state.username );
    const password = useSelector((state) => state.password);
    const isPC = useMediaQuery("(min-width:700px)");


   




    return (<>
        <Routes>


            <Route path="/" element={ <Login/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/tutorialPhone" element={<Tutorial />} />
                <Route path="/tutorialPC" element={<TutorialPC />} />

            
</Routes>
 </> );
}

export default App;
