import Note from './Note';
import Form from './Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Home = () => {

    const username = useSelector((state) => state.username);
    const [addTaskDisplayStatus, addTaskDisplay] = useState(false);

    const [tasks, updateTasks] = useState([]);

    const addTaskDisplayHandler = () => {

        addTaskDisplay(!addTaskDisplayStatus);
    }

    useEffect(() => {

        axios.post('/getNotes', {username: username}).then(response => {


            updateTasks(response.data);
          
        });

    }, []);


    
  
    const addTaskHandler = (text) => {

        if (text.replace(/\s+/g, "").length > 0) {
            

            axios.post('/addNote', { text: text, username: username }).then(response => { updateTasks(prevState => { return [...prevState, { id: response.data.id, notes: response.data.notes }] }); });

        }
       


    }
    


    return (<><div className="w3-center w3-container w3-black w3-wide w3-xlarge">
        Daily ToDo
    </div>

        <br />

        <div onClick={() => { updateTasks([]); axios.post('/endTheDay', {username: username })} } className="w3-button w3-red w3-round w3-hover-black w3-badge">END DAY</div>

        <br />

        <div className="w3-container w3-padding">


            {tasks.map(task => <Note key={ task.id} number={task.id} text={task.notes} /> ) }



            

        </div>
        

        {addTaskDisplayStatus && <Form cancelHandler={addTaskDisplayHandler} saveTaskHandler={addTaskHandler }/>}



        {!addTaskDisplayStatus && <div onClick={ addTaskDisplayHandler} style={{position:'fixed',  width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }} className=" roll-in-left  w3-card-4 w3-center w3-badge w3-display-bottomright w3-jumbo w3-black">+</div>}
       
        
        
        
        </>

    ); 




}



export default Home;