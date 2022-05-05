import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { loginData } from './Store';
import { useLongPress } from 'use-long-press';


import EditModal from './EditModal';

const Note = (props) => {

    const [isComplete, completeStatus] = useState({status: false, color: ""});

    const [longPressed, setLongPresseds] = useState(false);

    const username = useSelector((state) => state.username);
   

    useEffect(() => {

        axios.post('/getNoteStatus', { id: props.number, username: username }).then(result => { completeStatus(result.data ? { status: true, color: "w3-text-red" } : { status: false, color: "" });  });


    },
    []);

  

        const bind = useLongPress(() => {

            setLongPresseds(true);

        });

    const closeModal = () => {


        setLongPresseds(false);
    }
    


   const taskStatusHandler = () => {

       if (!longPressed) {

           completeStatus(!isComplete.status ? { status: true, color: "w3-text-red" } : { status: false, color: "" });

           axios.post('/completeStatus', { id: props.number, username: username }).then((status) => { });

       }
    
       
    }



    const onRightClick = (e) => {

        e.preventDefault();
        setLongPresseds(true);

    }


    

    return (
        <>
            <div {...bind()} onContextMenu={ onRightClick } onClick={taskStatusHandler} className="w3-container dancingFont w3-xlarge  scale-in-center  w3-large w3-border-bottom w3-margin " >

            {!isComplete.status && <span className={isComplete.color}>  <span className="w3-wide fa fa-circle "> </span> {"  "}
                {props.text}
                {" "}{" "}
            </span>}

            {isComplete.status && <> <span className="w3-wide fa fa-check-circle"> </span> <strike className={isComplete.color}>   {"  "}
                {props.text}
                {" "}{" "}
            </strike></>}
            
            
        </div>
            {longPressed && <EditModal close={ closeModal} username={username} id={props.number} text={props.text} />}
</>
    );
}



export default Note;