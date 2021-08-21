import { DeleteTask,EditTask,CompleteTask} from "../actions/domOperations.js";

export const Task=(element)=>{
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