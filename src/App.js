import React, { useState } from 'react';
import './App.css';

import {atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt, string} from 'mathjs';

function App()
{

  const buttons = [1,2,3,"+",4,5,6,"-",7,8,9,"*","clear",0,"/","="];
  const [equation, updateEquation] = useState("");

  function AddToEquation(b)
  {
    let invalidInput=false;
    let regexNums = new RegExp("[0-9]");
    let regexOps = new RegExp("[+*-/]");

    //disallow input if this is the first input and it is NOT a number (e.g: * 4)
    if(equation == "" && !regexNums.test(b)) invalidInput=true;

    if (equation.length > 0)
    {
      //disallow input if most recent character is operator, AND input is operator (e.g: 44 + *)
      if (regexOps.test(equation[equation.length-1]) && regexOps.test(b)) invalidInput=true; 
    }


    if (!invalidInput)
    {
      if (b==="=") updateEquation(string(evaluate(equation)))
      else
      {
        if (b==="clear") updateEquation("");
        else updateEquation(equation+b);
      }
    }
  }




  return (
    <div className="App">
      
      <div className="display">{equation}</div>

      <div className="buttons">
      {buttons.map((btn, index) => {
        return(
          <button key={index} onClick={() => AddToEquation(btn)} > {btn} </button>
        )
      }
      )}
      </div>
    </div>
  );
}

export default App;
