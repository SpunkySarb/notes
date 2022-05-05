import React from 'react';
import bgPhone from './bg.jpg';
import bgPC from './pcBG.jpg';
import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginData } from './Store';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import  useMediaQuery  from 'use-mediaquery';
const Login = () => {

    const isPC = useMediaQuery("(min-width:700px)");
     let image;
    let formWidth;
    let tutorialPath;
    let whichTutorial;

    if (isPC) {
        whichTutorial = "tutorialViewPC";
        tutorialPath = "/tutorialPC";
        image = bgPC;
        formWidth = "50%";
    } else if (!isPC) {
        whichTutorial = "tutorialViewPhone";
        tutorialPath = "/tutorialPhone ";
        image = bgPhone;
        formWidth = "90%";
    }

    const [authStatus, updateAuthStatus] = useState(false);

    const dispatchLoginData = useDispatch();

    const [credentialsValidity, updateCredentialsValidity] = useState(true);
    const [userCreated, setUserCreated] = useState(false);
    const [userExists, userExistStatus] = useState(false);

    const [createAccountMsg, setCreateAccountMsg] = useState(<></>);


    const usernameRef = useRef();
    const passwordRef = useRef();

    //validating username and password


    const [passValid, setPassValid] = useState(true);

    //isername constraints
    const [usernameLengthStatus, setUsernameLengthStatus] = useState(false);

    //login
    const loginHandler = () => {

        if (!usernameLengthStatus && passValid && usernameRef.current.value.length>0 && passwordRef.current.value.length>0) {

            localStorage.setItem('todoUserName', usernameRef.current.value);
            localStorage.setItem('todoPassword', passwordRef.current.value);

            dispatchLoginData(loginData.setLoginData({ username: usernameRef.current.value, password: passwordRef.current.value }));

            //authenticate here
            axios.post('/auth', { username: usernameRef.current.value, password: passwordRef.current.value }).then((response) => {

                if (response.data.authorized === true) {
                    updateAuthStatus(true);

                } else {
                    setCreateAccountMsg(<></>);
                    updateAuthStatus(false);
                    setUserCreated(false);
                    userExistStatus(false);
                    updateCredentialsValidity(false);
                }


            });
        }
       


    }

    //creating user
    const createUser = () => {
        if (!usernameLengthStatus && passValid && usernameRef.current.value != "" && passwordRef.current.value != "") {
            
            localStorage.setItem('todoUserName', usernameRef.current.value);
            localStorage.setItem('todoPassword', passwordRef.current.value);

            dispatchLoginData(loginData.setLoginData({ username: usernameRef.current.value, password: passwordRef.current.value }));

            //authenticate here
            axios.post('/register', { username: usernameRef.current.value, password: passwordRef.current.value }).then((response) => {


                if (response.data.userCreated) {
                    setCreateAccountMsg(<></>);
                    setUserCreated(true);
                    updateCredentialsValidity(true);
                    userExistStatus(false);
                } else {
                    setCreateAccountMsg(<></>);
                    setUserCreated(false);
                    userExistStatus(true);
                    updateCredentialsValidity(true);

                }


            });


        } else {
            setCreateAccountMsg(<div className="w3-wide w3-text-red w3-center w3-margin rotate-hor-center">Please fill the username and choose the password and then click create account...</div>);
        }

    }

    useEffect(() => {


       const username = localStorage.getItem('todoUserName');
        const password = localStorage.getItem('todoPassword');

        dispatchLoginData(loginData.setLoginData({ username: username, password: password }));
        
        //authernticate here from local storage
        axios.post('/auth', { username: username, password: password}).then((response) => {

            if (response.data.authorized === true) {
                updateAuthStatus(true);
            } else{

                updateAuthStatus(false);
               
            }


        });
    },
        []);

    
   

    const validateUsername = () => {
        setUsernameLengthStatus(true);
        if (usernameRef.current.value.length > 7) {
            setUsernameLengthStatus(false);
        }

    }

    //password constraints...

    const [passValidity, setPassValidity] = useState({
        characters: <li>atleast 8 characters.</li>,
        uppercase:  <li>atlease 1 uppercase letter.</li>,
        numbers:  <li>at least one number</li>
    });

    const validatePassword = () => {

       


        setPassValid(false);

        let numberCheck = new RegExp("^(?=.*\\d)");
        let uppercaseCheck = new RegExp("^(?=.*[A-Z])");

        if (uppercaseCheck.test(passwordRef.current.value)) {
           
            setPassValidity(prev => { return { ...prev, uppercase: '' } });
          
        } else {
            setPassValid(false);
            setPassValidity(prev => { return { ...prev, uppercase: <li>atlease 1 uppercase letter.</li> } });

        }


        if (passwordRef.current.value.length > 7) {

            setPassValidity(prev => { return { ...prev, characters: '' } });
            

        } else {
            setPassValid(false);
            setPassValidity(prev => { return { ...prev, characters: <li>atleast 8 characters.</li> } });

        }


        if (numberCheck.test(passwordRef.current.value)) {
            setPassValidity(prev => { return { ...prev, numbers: '' } });
            
        } else {
            setPassValid(false);
            setPassValidity(prev => { return { ...prev, numbers: <li>at least one number</li> } });

        }

        if (uppercaseCheck.test(passwordRef.current.value) && passwordRef.current.value.length > 7 && numberCheck.test(passwordRef.current.value)) {
            setPassValid(true);
        } else {
            setPassValid(false);
        }


    }


    if (authStatus) {

        if (localStorage.getItem(whichTutorial) == 'true') {
            return <Navigate to="/home" />;
        } else {
            return <Navigate to={ tutorialPath} />;
        }


        


        

    }  
    

    return (<div style={{ backgroundImage: `url(${image})`, minWidth: window.innerWidth, minHeight: window.innerHeight, backgroundSize: 'cover', backgroundRepeat: "no-repeat"}}>
        <div className="w3-black w3-xlarge w3-wide w3-center">Daily ToDo</div>
        <br />
        <br /><br /><br />

        {!credentialsValidity && <div className="w3-wide w3-text-red w3-center rotate-hor-center">invalid password or username. <br/> if you are a new user the try creating account.</div>}
        {userExists && <div className="w3-wide w3-text-red w3-center rotate-hor-center">Username Already exists!!!<br /> try another...</div>}
        {createAccountMsg}
        {userCreated && <div className="w3-wide w3-text-green w3-center rotate-hor-center">Congratulations!<br/> You are Registered Now...<br/><br/>Try Logging In Now...</div>}
        <br /><br /><br />




        <div style={{ width: formWidth, margin: 'auto' }} className="w3-card-4 w3-round-xlarge w3-container">

            <br />



            <div className="w3-display-container">
                <input onKeyUp={validateUsername } ref={ usernameRef} type="text" style={{ width: '100%', margin: 'auto' }} className="w3-input w3-center w3-wide w3-black" placeholder="Enter UserName..."    />
                <br />

                {usernameLengthStatus &&<> <div className=" w3-round-large w3-padding bounce-in-top  w3-red"><span className="fa fa-circle"></span> must be atleast 8 characters</div><br/></> }
              

                <input onKeyUp={validatePassword} ref={passwordRef } type="password" style={{ width: '100%', margin: 'auto' }} className="w3-input w3-center w3-wide w3-black" placeholder="Enter Password..." />
                <br />

                {!passValid && <ul className="w3-red w3-round-large bounce-in-top">
                   
                    {passValidity.characters }
                    {passValidity.uppercase}
                    {passValidity.numbers}
                </ul>}


                <br />  <br />  <br /> 
                <div style={{ width: '100%' }} className="w3-display-bottommiddle">
                    <div  onClick={loginHandler} style={{ width: '100%' }} className="w3-button w3-black w3-round w3-wide " >login</div>  <br />  <br />
                <div onClick={createUser} style={{ width: '100%' }} className="w3-button w3-black w3-round w3-wide " >create Account</div>
            </div><br />
                <br />
            </div>
            <br />
        </div>

    </div>);
}


export default Login;