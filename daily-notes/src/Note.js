import { useState, useEffect } from 'react';
import axios from 'axios';

import React from 'react';
const Note = (props) => {

    const [isComplete, completeStatus] = useState({status: false, color: ""});



    useEffect(() => {

        axios.post('/getNoteStatus', { id: props.number }).then(result => { completeStatus(result.data ? { status: true, color: "w3-text-red" } : { status: false, color: "" }); console.log(result.data); });


    },
    []);




   const taskStatusHandler = () => {

       completeStatus(!isComplete.status ? { status: true, color: "w3-text-red" } : { status: false, color: "" });

       axios.post('/completeStatus', { id: props.number }).then((status) => {   });
       
    }


    return (

        <div onClick={taskStatusHandler} className="w3-container scale-in-center  w3-large w3-border-bottom w3-margin " >

            {!isComplete.status && <span className={isComplete.color}>  <span className="w3-wide"> {props.number}</span> {".  "}
                {props.text}
                {" "}{" "}
            </span>}

            {isComplete.status && <strike className={isComplete.color}>  <span className="w3-wide"> {props.number}</span> {".  "}
                {props.text}
                {" "}{" "}
            </strike>}

        </div>


    );
}



export default Note;