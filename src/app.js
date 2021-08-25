import { addTask, DisplayAllTasks } from "./actions/domOperations.js";
import {Toggle} from "./actions/theme.js"
// import "../styles/styles.css";
// import "../styles/media-queries.css";

window.onload=()=>{

  DisplayAllTasks();

  
}



let theme=document.getElementById("theme")
theme.addEventListener('click',Toggle)



export const TaskList=(event)=>{
  event.preventDefault();
  let taskDesc=document.taskInput.task.value; 
  // check if string has characters in it
  if(!taskDesc.trim().length){
    alert("Enter Task");
    return
  }
    addTask(taskDesc)
    document.taskInput.task.value="";

}



const date=document.getElementById("date");

date.innerText=getday();

function getday(){

    const today = new Date();

    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    };

  return today.toLocaleDateString("en-US", options);
  }
  
let taskinput=document.getElementById("taskform")
taskinput.addEventListener("submit",TaskList)
  
