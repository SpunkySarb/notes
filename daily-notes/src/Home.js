import Note from './Note';
import Form from './Form';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginData } from './Store';
import { Navigate } from 'react-router-dom';
import useMediaQuery from 'use-mediaquery';




const Home = () => {

    const username = useSelector((state) => state.username);
    const [addTaskDisplayStatus, addTaskDisplay] = useState(false);
    const [logout, logoutStatus] = useState(false);
    const tasks = useSelector(state=> state.tasksState);

    const taskDispatcher = useDispatch();

    const isPC = useMediaQuery("(min-width:700px)");


    let pcWidth = "";

    if (isPC) {
        pcWidth = "50%";
    } else {
        pcWidth = "";
    }

   


    const addTaskDisplayHandler = () => {

        addTaskDisplay(!addTaskDisplayStatus);
    }

    useEffect(() => {

        axios.post('/getNotes', {username: username}).then(response => {
          
            taskDispatcher(loginData.updateTasks({data: [...response.data] }));
            
          
        });

    }, []);


    
  
    const addTaskHandler = (text) => {

        if (text.replace(/\s+/g, "").length > 0) {
            

            axios.post('/addNote', { text: text, username: username }).then(response => { taskDispatcher(loginData.updateTasks({ data: [...tasks, { id: response.data.id, notes: response.data.notes }] }))}  );

        }
       


    }


    if (logout) {

        return <Navigate  to="/"  />
    }
    
    const endTheDay = () => {

        axios.post('/endTheDay', { username: username }).then(response => {


            axios.post('/getNotes', { username: username }).then(response => {

                taskDispatcher(loginData.updateTasks({ data: [...response.data] }));


            });
        });


    }

    return (<><div className="w3-center  w3-container w3-black w3-wide w3-xlarge">
        Daily ToDo
    </div>

        <br />
        <div className="w3-bar">
            <div onClick={ endTheDay} className="w3-button w3-bar-item w3-black w3-card-4 w3-round w3-hover-black w3-badge">END DAY</div>
            <div onClick={() => { localStorage.setItem('todoUserName', ""); localStorage.setItem('todoPassword', ""); logoutStatus(true); }} className="w3-button w3-bar-item w3-right w3-black w3-xlarge w3-card-4 w3-round w3-hover-black fa fa-sign-out w3-badge"></div></div>
        <br />

        <div style={{width:pcWidth, margin:'auto'}} className="w3-container w3-padding">


            {tasks.map(tasks => <Note key={tasks.id} number={tasks.id} text={tasks.notes} /> ) }

           
          


            <br />  <br />  <br />  <br />  <br />  <br />  <br />  
        </div>
        

        {addTaskDisplayStatus && <Form cancelHandler={addTaskDisplayHandler} saveTaskHandler={addTaskHandler }/>}



        {!addTaskDisplayStatus && <div onClick={ addTaskDisplayHandler} style={{position:'fixed',  width: '80px', height: '80px', marginRight: '10px', marginBottom: '10px' }} className=" roll-in-left  w3-center w3-badge w3-hover-transparent w3-display-bottomright w3-jumbo w3-text-black fa fa-pencil w3-transparent"></div>}
       
        
        
        
        </>

    ); 




}



export default Home;