import {apicall} from "../src/apicalls/apirequest.js";
import {modal} from "../src/components/modal.js"


export const Login=async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let url="http://localhost:3000/users/login"
    let obj={
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json' 
        },
        body:JSON.stringify(formProps)
    }
    const response=await apicall({url:url,obj:obj})
    console.log(response);
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
        window.location.href="http://127.0.0.1:5500/Task.html"
    }
    
        

}



let log=document.getElementById("login-form");
log.addEventListener("submit",Login)