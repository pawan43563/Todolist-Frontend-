import {apicall} from "../src/apicalls/apirequest.js";



export const Login=async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let url="https://todolist-backend786.herokuapp.com/users/login"
    let obj={
        method:"POST",
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json' 
        },
        body:JSON.stringify(formProps)
    }
    const response=await apicall({url:url,obj:obj})
    if(response==="503"){
        alert("Can't Authenticate User Server is in offline mode")
        return 
    }
    if(!response){
        alert("Please provide your correct email and password")
        return 
    }
    localStorage.setItem("token",response.token)
    if(response.token){
        window.location.href="https://pawan43563.github.io/Todolist-Frontend-/Task.html"
    }
    
        

}



let log=document.getElementById("login-form");
log.addEventListener("submit",Login)