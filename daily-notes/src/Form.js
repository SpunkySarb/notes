
import { useRef } from 'react';


const Form = (props) => {


    const textRef = useRef();


    return (<div style={{minWidth: window.innerWidth}} className=" w3-container w3-card-4 w3-black w3-display-bottommiddle">
        <br />
        <input ref={ textRef} className="w3-input  w3-center w3-large w3-white" type="text" placeholder="Write Task..." />
        <br/>
        <div onClick={props.cancelHandler } className="w3-red w3-wide w3-button  w3-padding-small">CANCEL</div>
        <div onClick={() => { props.saveTaskHandler(textRef.current.value); textRef.current.value = ""; }} className="w3-blue w3-wide w3-button w3-right  w3-padding-small">SAVE</div>
        <br /><br />

    </div>);
}


export default Form;