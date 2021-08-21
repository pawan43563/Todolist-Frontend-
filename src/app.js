import { addTask, DisplayAllTasks } from "./actions/domOperations.js";
import {Toggle} from "./actions/theme.js"
import {apicall} from "./apicalls/apirequest.js"
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

export const Logout=(event)=>{
  event.preventDefault();
  if(confirm("Are you sure you want to logout?")){
    localStorage.removeItem("token");
    window.location.href="http://127.0.0.1:5500/login.html"
  }
  return;
  
}

export const Delete1=async (event)=>{
  event.preventDefault();
  if(confirm("Are you sure you want to Delete?")){
    let url="http://localhost:3000/users/delete-user"
    let obj={
        method:"DELETE",
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json' 
        },
    }
    const response=await apicall({url:url})
    localStorage.removeItem("token");
    window.location.href="http://127.0.0.1:5500/register.html"
  }
  return;
  
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
  

const logout=document.getElementById("logout")
logout.addEventListener("click",Logout)

const delete1=document.getElementById("delete");
delete1.addEventListener("click",Delete1)