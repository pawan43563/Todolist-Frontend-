import {apicall} from "../src/apicalls/apirequest.js"


export const Register=async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let url="http://localhost:3000/users/register"
    let obj={
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json' 
        },
        body:JSON.stringify(formProps)
    }
    const response=await apicall({url:url,obj:obj})
    if(response==="503"){
        alert("Can't Register User Server is in offline mode")
        return 
    }
    if(!response){
        alert("Please Enter the details to register")
        return 
    }
    window.location.href="http://127.0.0.1:5500/login.html";

}

let reg=document.getElementById("register-form");
reg.addEventListener("submit",Register)



