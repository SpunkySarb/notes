import React from 'react';

import axios from 'axios';

import { useState, useRef } from 'react';
import { loginData } from './Store';
import { useSelector, useDispatch } from 'react-redux';
const EditModal = (props) => {

    const [animation, setAnimation] = useState("scale-in-center");
    const tasks = useSelector(state=>state.tasksState);
    const dispatchTask = useDispatch();
    const dispatchEditModal = useDispatch();
    const textAreaRef = useRef();
    const deleteNote = () => {


        axios.post('/deleteNote', { username: props.username, id: props.id }).then(response => {

            axios.post('/getNotes', { username: props.username }).then(response => {
                console.log(response);
                dispatchTask(loginData.updateTasks({ data: [...response.data] }));


            });
        });

    }

    const updateNote = () => {

        let text = textAreaRef.current.value;
        axios.post('/updateNote', { username: props.username, id: props.id, notes: textAreaRef.current.value }).then(response => {


            axios.post('/getNotes', { username: props.username }).then(response => {
               
                dispatchTask(loginData.updateTasks({ data: [...response.data] }));


            });



            
            
        


        }).catch((err) => console.log("Err Msg", err));
           


    }


    return (<div className={`w3-display-container ${animation}`}>

        <span onClick={() => { setAnimation("scale-out-center"); setTimeout(() => { props.close(); setAnimation("scale-in-center") }, 500); }} className="fa fa-close w3-xxlarge w3-text-red w3-display-topright"></span>
        <br /><br />
        <div className="w3-container w3-black ">

            <br />
            <textarea ref={textAreaRef } className="w3-input w3-xlarge dancingFont" type='textarea' defaultValue={ props.text}/>
            <br />
            <div onClick={() => { updateNote(); props.close(); }} className="w3-button w3-white w3-right fa  fa-save w3-xxlarge w3-round-large"></div>
            <div onClick={() => { deleteNote(); props.close(); }} className="w3-button w3-red  fa fa-trash w3-xxlarge w3-round-large"></div>
            
            
            <br /><br />
        </div>

        
    </div>);
}

export default EditModal;