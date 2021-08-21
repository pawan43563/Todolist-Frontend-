import { apicall } from "./apirequest.js"

// let url="https://lit-brushlands-91579.herokuapp.com/tasks"
// let url="http://localhost:3000/tasks"
let url="https://todolist-backend786.herokuapp.com/tasks"

let token=localStorage.getItem("token")
export const getAllTasks=()=>{
    return apicall({url:url,obj:{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }})
}

export const createTask=(formData)=>{
    let obj={
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' ,
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(formData)
    }
    return apicall({url:url,obj:obj})

}

export const deleteTaskById=(id)=>{
    return apicall({url:`${url}/${id}`,obj:{method:"DELETE",
    headers:{
        'Authorization':`Bearer ${token}`
    }
    }})
}


export const updateTask=({id,data})=>{
    let obj={
        method:"PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' ,
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    }
    return apicall({url:`${url}/${id}`,obj:obj})

}

export const deleteAll=()=>{
    return apicall({url:url,obj:{
        method:"DELETE",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }})
}