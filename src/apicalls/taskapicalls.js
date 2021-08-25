import { apicall } from "./apirequest.js"

let url="https://polar-woodland-07461.herokuapp.com/tasks"

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
            'Content-Type': 'application/json' 
        },
        body:JSON.stringify(formData)
    }
    return apicall({url:url,obj:obj})

}

export const deleteTaskById=(id)=>{
    return apicall({url:`${url}/${id}`,obj:{method:"DELETE"}})
}


export const updateTask=({id,data})=>{
    let obj={
        method:"PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        body:JSON.stringify(data)
    }
    return apicall({url:`${url}/${id}`,obj:obj})

}

export const deleteAll=()=>{
    return apicall({url:url,obj:{
        method:"DELETE",
    }})
}