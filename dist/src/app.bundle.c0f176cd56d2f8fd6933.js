/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: TaskList

;// CONCATENATED MODULE: ./src/components/task.js


const Task=(element)=>{
          const tasklist=document.createElement("div");
          let taskDiv=document.createElement("div");
          taskDiv.id=element.taskId;
          taskDiv.classList.add("item")
  
          // task completed
  
          let taskDesc1=document.createElement("i");
          taskDesc1.classList.add("fa","fa-check-circle");
          // delete 
          let remove=document.createElement("i");
          remove.classList.add("fa","fa-trash","fa-2x");

          
          let taskDesc=document.createElement("input");
          taskDesc.type="text";
          taskDesc.setAttribute('isEdited',false)
          taskDesc.classList.add("inputitem")
          taskDesc.disabled=true;
          taskDesc.addEventListener('change',()=>{;
            if(!event.target.isEdited){
              event.target.isEdited=true
            }
          })
          taskDesc.setAttribute('value',element.content);
          
          // check if task is completed and according to it apply stying to  its field 
          if(element.isComplete){
            taskDesc.style.textDecoration="line-through";
            taskDesc1.value="1";
          }else{
            taskDesc.style.textDecoration="none";
            taskDesc1.classList.remove("fa-check-circle")
            taskDesc1.classList.add("fa-circle")
            taskDesc1.value="0";
          }
          
          // edit
  
          const update=document.createElement("i");
          update.classList.add("fa","fa-edit")
          taskDiv.appendChild(taskDesc1);
          taskDiv.appendChild(taskDesc);
          taskDiv.appendChild(update);
          
          // updated
          let taskLog=document.createElement("p");
          if(element.updatedAt.length>1){
            let small=document.createElement("p");  
            small.id="time"
            small.classList.add("smalleredit");
            small.textContent="(Edited)";
            taskLog.textContent=element.updatedAt;
            taskDiv.appendChild(taskLog);
            taskDiv.appendChild(remove);
            taskDiv.appendChild(small);
            tasklist.appendChild(taskDiv) 
            
          }else{
            taskLog.textContent=element.createdAt;
            taskDiv.appendChild(taskLog);
            taskDiv.appendChild(remove);
          
        }
        remove.addEventListener('click',DeleteTask)
        update.addEventListener('click',EditTask)
        taskDesc1.addEventListener('click',CompleteTask)
        return taskDiv

}
;// CONCATENATED MODULE: ./src/apicalls/apirequest.js


const apicall=async ({url:url,obj={}})=>{
    try{
        let response=await fetch(url,obj);
        let data=await response.json();
        return await data.data
    }catch(error){
        return "503"
  
    }
}
;// CONCATENATED MODULE: ./src/apicalls/taskapicalls.js


let url="https://polar-woodland-07461.herokuapp.com/tasks"

let token=localStorage.getItem("token")
const getAllTasks=()=>{
    return apicall({url:url,obj:{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }})
}

const createTask=(formData)=>{
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

const deleteTaskById=(id)=>{
    return apicall({url:`${url}/${id}`,obj:{method:"DELETE"}})
}


const updateTask=({id,data})=>{
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

const deleteAll=()=>{
    return apicall({url:url,obj:{
        method:"DELETE",
    }})
}
;// CONCATENATED MODULE: ./src/components/modal.js
let errordiv=document.getElementById("error")
const modal=(msg,msg1)=>{
    let p=document.createElement("p");
    let big=document.createElement("span");
    p.innerText=`${msg}. ${msg1}`;
    p.style.margin="10px"
    p.style.color="red";
    p.style.fontSize="1.2rem"
    errordiv.appendChild(p)
}
;// CONCATENATED MODULE: ./src/actions/domOperations.js



const contentDiv=document.getElementById("content");
let domOperations_reset=document.getElementById("reset")
let domOperations_errordiv=document.getElementById("error")
let msg1="Make sure you are connected to the Internet."
let msg2="Server is in Offline mode."
const domOperations_status=()=>{
    if(navigator.onLine===false){
        return true
    }else{
        domOperations_errordiv.innerText=""
    }
}

const DisplayAllTasks=async()=>{

    let arr=await getAllTasks();
    if(arr==="503"){
        modal("Can't fetch tasks",msg2)
        return 
    }
    if(!arr){
        domOperations_reset.style.display="none"
        return;
    }else{
        arr.forEach(element=>{
            contentDiv.appendChild(Task(element))           
        })
       

    }
    const body=document.getElementsByTagName("body")[0]
    const title=document.querySelector(".title")
    const icon=document.getElementById('theme')
    if(localStorage.getItem('theme')==="light"){
        body.classList.add('light');
        title.classList.add('lighttitle');
        icon.classList.remove('fa-moon')
        icon.classList.add('fa-sun')

        }

}


const addTask=async (taskDesc)=>{
    if(domOperations_status()){
        modal("Can't add Task",msg1)
        return
    }
    FormData={
        "content":taskDesc,
        "updatedAt":"",
        "createdAt":new Date().toLocaleString()
    }
    const obj=document.getElementById("content")
    let response=await createTask(FormData)
    if(response==="503"){
        modal("Can't add Task",msg2)
        return 
    }
    obj.appendChild(Task(response))
    domOperations_reset.style.display="block"
    

}



const DeleteTask=async (event)=>{
    if(domOperations_status()){
        modal("Can't Delete Task",msg1)     
        return
    }
    event.preventDefault();
    if(confirm('Cick Yes to confirm')){
        let id=event.target.parentElement.id;
        const obj=document.getElementById(id);
        const response=await deleteTaskById(id);
        if(response==="503"){
            modal("Can't Delete Task",msg2)
            return 
        }
        obj.remove()
       
    }
}






const EditTask=async (event)=>{
    if(domOperations_status()){
        modal("Can't edit Task",msg1)
        return
    }
    event.preventDefault()
    let FormData;
    let id=event.target.parentElement.id;
    let updatedValue=document.getElementById(id).childNodes[1];
    let dis=event.target.parentElement.childNodes[0];
    if(dis.classList.contains("fa-check-circle")){
      return 
    }
    else{
        const obj=document.getElementById(id);
      if(!updatedValue.value.trim().length){
        alert("Enter Valid input");
        return
      }
        if(event.target.classList.contains("fa-check")){
            
            FormData={
                "content":updatedValue.value.trim(),
                "updatedAt":new Date().toLocaleString(),
                "createdAt":new Date().toLocaleString(),
                "isComplete":false
            }
            const obj=document.getElementById(id);

            let response=await updateTask({id:id,data:FormData})  
            if(response==="503"){
                modal("Can't Edit the task",msg2)
                return 
            }
            if(obj.childNodes[1].isEdited){
                let small=document.createElement("p");  
                small.id="time"
                small.classList.add("smalleredit");
                small.textContent="(Edited)";
                let value=obj.lastChild.id;
                
                if(!value){
                    obj.appendChild(small)

                }
                obj.childNodes[3].textContent=FormData.updatedAt
             
                obj.childNodes[1].isEdited=false     
                        

                
                event.target.classList.add("fa-edit")
                event.target.classList.remove("fa-check")
            }else{
                event.target.classList.add("fa-edit")
                event.target.classList.remove("fa-check")
            }
            
          
        }
        else{
            event.target.parentElement.childNodes[1].removeAttribute("disabled");
            event.target.classList.remove("fa-edit")
            event.target.classList.add("fa-check")
       
      }
    }
            
     
}

const format=({content,createdAt,isComplete})=>{
    return {
        "content":content,
        "updatedAt":new Date().toLocaleString(),
        "createdAt":new Date().toLocaleString(),
        "isComplete":isComplete
    }
}

const CompleteTask=async (event)=>{
    if(domOperations_status()){
        modal("Can't complete Task",msg1)
        return
    }
    let id=event.target.parentElement.id;
    let obj=document.getElementById(id)

    if(event.target.value!=="0"){

            if(event.target.classList.contains("fa-circle")){
                FormData=format({
                    content:obj.childNodes[1].value,
                    isComplete:true
                })
                let response=await updateTask({id:id,data:FormData})
                if(response==="503"){
                    modal("Can't Complete the task",msg2)
                    return 
                }
                obj.childNodes[3].textContent=FormData.updatedAt
                
                event.target.value="1";
                event.target.classList.add("fa-check-circle")
                event.target.classList.remove("fa-circle")
                event.target.parentElement.childNodes[1].style.textDecoration="line-through";
            }else{
                FormData=format({
                    content:obj.childNodes[1].value,
                    isComplete:false
                })
                let response=await updateTask({id:id,data:FormData})
                if(response==="503"){
                    modal("Can't Complete the task",msg2)
                    return 
                }
                obj.childNodes[3].textContent=FormData.updatedAt
                event.target.value="0";
                event.target.classList.remove("fa-check-circle")
                event.target.classList.add("fa-circle")
                event.target.parentElement.childNodes[1].style.textDecoration="none";
            }
            
           
    }
    else{
        FormData=format({
            content:obj.childNodes[1].value,
            isComplete:true
        })
        let response=await updateTask({id:id,data:FormData})
        if(response==="503"){
            modal("Can't Complete the task",msg2)
            return 
        }
        obj.childNodes[3].textContent=FormData.updatedAt

        event.target.value="1";
        event.target.classList.add("fa-check-circle")
        event.target.classList.remove("fa-circle")
        event.target.parentElement.childNodes[1].style.textDecoration="line-through";

      }

    }

const Reset=async ()=>{
    if(domOperations_status()){
        modal("Can't reset Task",msg1)
        return
    }
    if(confirm("Are you sure you want to delete all task?")){
        let response=await deleteAll();
        if(response==="503"){
            modal("Can't Delete all the tasks",msg2)
            return 
        }else{
            contentDiv.innerHTML=""
            domOperations_reset.style.display="none"
        }
        
    }
    
    
}




if(!contentDiv.hasChildNodes()){
    domOperations_reset.style.display="none"
}else{
    domOperations_reset.style.display="block"
}
domOperations_reset.addEventListener('click',Reset)

;// CONCATENATED MODULE: ./src/actions/theme.js
const Toggle=(event)=>{
    const body=document.getElementsByTagName("body")[0];
    const title=document.querySelector(".title")
    if(event.target.classList.contains("fa-sun")){
        localStorage.setItem("theme","dark")
        event.target.classList.remove("fa-sun");
        event.target.classList.add("fa-moon");
        body.classList.remove("light")
        title.classList.remove("lighttitle")
    }else{
        event.target.classList.remove("fa-moon");
        event.target.classList.add("fa-sun")
        body.classList.add("light")
        localStorage.setItem("theme","light")
        title.classList.add("lighttitle")
    }
}
;// CONCATENATED MODULE: ./src/app.js






window.onload=()=>{

  DisplayAllTasks();

  
}



let theme=document.getElementById("theme")
theme.addEventListener('click',Toggle)



const TaskList=(event)=>{
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
  

/******/ })()
;