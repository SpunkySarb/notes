
import image from './bg.jpg';
import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginData } from './Store';
import axios from 'axios';
import { Navigate } from "react-router-dom";
const Login = () => {

    const [authStatus, updateAuthStatus] = useState(null);

    const dispatchLoginData = useDispatch();




    const usernameRef = useRef();
    const passwordRef = useRef();


    const loginHandler = () => {

        localStorage.setItem('todoUserName', usernameRef.current.value);
        localStorage.setItem('todoPassword', passwordRef.current.value);

        dispatchLoginData(loginData.setLoginData({ username: usernameRef.current.value, password: passwordRef.current.value }));

       //authenticate here
        axios.post('/auth', { username: usernameRef.current.value, password: passwordRef.current.value }).then((response) => {

            if (response.data.authorized === true) {
                updateAuthStatus(true);
            } else {

                updateAuthStatus(null);

            }


        });


    }

    useEffect(() => {


       const username = localStorage.getItem('todoUserName');
        const password = localStorage.getItem('todoPassword');

        dispatchLoginData(loginData.setLoginData({ username: username, password: password }));

        //authernticate here from local storage
        axios.post('/auth', { username: username, password: password}).then((response) => {

            if (response.data.authorized === true) {
                updateAuthStatus(true);
            } else {

                updateAuthStatus(null);

            }


        });
    },
        []);



    if (authStatus) {

        return <Navigate to="/home" />;

    }

    return (<div style={{ backgroundImage: `url(${image})`, minWidth: window.innerWidth, minHeight: window.innerHeight, backgroundSize: 'cover', backgroundRepeat: "no-repeat"}}>
        <div className="w3-black w3-xlarge w3-center">Daily ToDo</div>
        <br />
        <br /><br /><br /><br /><br /><br />

        <div style={{width:'90%', margin:'auto'}} className="w3-card-4 w3-round-xlarge w3-container">

            <br />
            <div className="w3-display-container">
                <input ref={ usernameRef} type="text" style={{ width: '90%', margin: 'auto' }} className="w3-input w3-center w3-wide w3-black" placeholder="Enter UserName..."    />
            <br />
                <input ref={passwordRef } type="password" style={{ width: '90%', margin: 'auto' }} className="w3-input w3-center w3-wide w3-black" placeholder="Enter Password..." />
            <br />

                <div onClick={loginHandler } style={{width:'60%'}} className="w3-button w3-black w3-round w3-wide w3-display-bottommiddle" >login</div>
               
            <br />
                <br />
            </div>
            <br />
        </div>

    </div>);
}


export default Login;