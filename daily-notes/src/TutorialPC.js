import addTask from './imagePC0.jpg';
import markComplete from './imagePC1.jpg';
import editTask from './imagePC2.jpg';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';


const TutorialPC = () => {



    const [closeTutorial, setCloseTutorial] = useState(false);


    const imageArray = [addTask, markComplete, editTask]

    const instructions = ["Click pencil to add tasks", "Click task to mark it done", "Right click to edit or delete"];


    const [imageState, setImageState] = useState(0);

    let rightButton = true;
    let leftButton = false;


    let x = imageState;
    if (x == 0) {
        rightButton = true;

    }
    if (x == 1) {
        leftButton = true;
        rightButton = true;


    }
    if (x == 2) {
        rightButton = false;
        leftButton = true;
    }




    const goRight = () => {
        setImageState(prev => prev + 1);





    }

    const goLeft = () => {
        setImageState(prev => prev - 1);




    }

    const skipTutorial = () => {

        localStorage.setItem('tutorialViewPC', 'true');

        setCloseTutorial(true);


    }



    if (closeTutorial) {

        return <Navigate to="/home" />
    }


    return (<div className="w3-container w3-black">

        <div style={{animationDuration:'2s', animationIterationCount:'infinite'}} className="w3-xlarge heartbeat w3-text-red w3-black dancingFont w3-center w3-wide w3-margin">{instructions[imageState]} </div>

        <div className="w3-display-container">

            <div className="w3-display-container w3-opacity-min w3-middle w3-margin-left w3-margin-bottom w3-margin-right">


                <img className="w3-image scale-in-center" src={imageArray[imageState]} />


            </div>
            {rightButton && <div onClick={goRight} className="w3-display-right fa fa-arrow-right  w3-center w3-blue w3-button w3-card-4 w3-xxlarge"></div>}
            {leftButton && <div onClick={goLeft} className="w3-display-left fa fa-arrow-left  w3-center w3-blue w3-button w3-card-4 w3-xxlarge"></div>}
            <div onClick={skipTutorial} className="w3-display-bottomleft fa fa-close  w3-center w3-round   w3-blue w3-button w3-card-4 w3-wide w3-xxlarge"> </div>





        </div>
        <br /> <br />
    </div>);

}


export default TutorialPC;