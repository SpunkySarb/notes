
import { useRef } from 'react';
import React from 'react';
import useMediaQuery from 'use-mediaquery';
const Form = (props) => {

    const isPC = useMediaQuery("(min-width:700px)");
    const textRef = useRef();

    let formWidth;
    if (isPC) {
    
        formWidth = "50%";
    } else if (!isPC) {
       
        formWidth = "100%";
    }


    

    return (<div style={{width:formWidth, position:'fixed'}} className=" w3-container w3-card-4 w3-black w3-display-bottommiddle">
        <br />
        <input ref={ textRef} className="w3-input  w3-center w3-large w3-white" type="text" placeholder="Write Task..." />
        <br/>
        <div onClick={props.cancelHandler } className="w3-red w3-wide w3-button fa fa-close w3-xxlarge w3-round-large w3-center  w3-padding-small"></div>
        <div onClick={() => { props.saveTaskHandler(textRef.current.value); textRef.current.value = ""; }} className="w3-white fa fa-save w3-xxlarge w3-round-large w3-wide w3-button w3-right  w3-padding-small"></div>
        <br /><br />

    </div>);
}


export default Form;