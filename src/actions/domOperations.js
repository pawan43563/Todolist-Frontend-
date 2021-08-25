import { Task } from "../components/task.js";
import {getAllTasks,deleteTaskById,createTask,updateTask,deleteAll} from "../apicalls/taskapicalls.js";
import { modal } from "../components/modal.js";
const contentDiv=document.getElementById("content");
let reset=document.getElementById("reset")
let errordiv=document.getElementById("error")
let msg1="Make sure you are connected to the Internet."
let msg2="Server is in Offline mode."
const status=()=>{
    if(navigator.onLine===false){
        return true
    }else{
        errordiv.innerText=""
    }
}

export const DisplayAllTasks=async()=>{

    let arr=await getAllTasks();
    if(arr==="503"){
        modal("Can't fetch tasks",msg2)
        return 
    }
    if(!arr){
        reset.style.display="none"
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


export const addTask=async (taskDesc)=>{
    if(status()){
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
    reset.style.display="block"
    

}



export const DeleteTask=async (event)=>{
    if(status()){
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






export const EditTask=async (event)=>{
    if(status()){
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

export const format=({content,createdAt,isComplete})=>{
    return {
        "content":content,
        "updatedAt":new Date().toLocaleString(),
        "createdAt":new Date().toLocaleString(),
        "isComplete":isComplete
    }
}

export const CompleteTask=async (event)=>{
    if(status()){
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

export const Reset=async ()=>{
    if(status()){
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
            reset.style.display="none"
        }
        
    }
    
    
}




if(!contentDiv.hasChildNodes()){
    reset.style.display="none"
}else{
    reset.style.display="block"
}
reset.addEventListener('click',Reset)
