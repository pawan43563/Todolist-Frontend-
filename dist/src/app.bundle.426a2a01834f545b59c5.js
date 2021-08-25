/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplayAllTasks": () => (/* binding */ DisplayAllTasks),
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "DeleteTask": () => (/* binding */ DeleteTask),
/* harmony export */   "EditTask": () => (/* binding */ EditTask),
/* harmony export */   "format": () => (/* binding */ format),
/* harmony export */   "CompleteTask": () => (/* binding */ CompleteTask),
/* harmony export */   "Reset": () => (/* binding */ Reset)
/* harmony export */ });
/* harmony import */ var _components_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);



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

const DisplayAllTasks=async()=>{

    let arr=await (0,_apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__.getAllTasks)();
    if(arr==="503"){
        (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't fetch tasks",msg2)
        return 
    }
    if(!arr){
        reset.style.display="none"
        return;
    }else{
        arr.forEach(element=>{
            contentDiv.appendChild((0,_components_task_js__WEBPACK_IMPORTED_MODULE_0__.Task)(element))           
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
    if(status()){
        (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't add Task",msg1)
        return
    }
    FormData={
        "content":taskDesc,
        "updatedAt":"",
        "createdAt":new Date().toLocaleString()
    }
    const obj=document.getElementById("content")
    let response=await (0,_apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__.createTask)(FormData)
    if(response==="503"){
        (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't add Task",msg2)
        return 
    }
    obj.appendChild((0,_components_task_js__WEBPACK_IMPORTED_MODULE_0__.Task)(response))
    reset.style.display="block"
    

}



const DeleteTask=async (event)=>{
    if(status()){
        (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't Delete Task",msg1)     
        return
    }
    event.preventDefault();
    if(confirm('Cick Yes to confirm')){
        let id=event.target.parentElement.id;
        const obj=document.getElementById(id);
        const response=await (0,_apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__.deleteTaskById)(id);
        if(response==="503"){
            (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't Delete Task",msg2)
            return 
        }
        obj.remove()
       
    }
}






const EditTask=async (event)=>{
    if(status()){
        (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't edit Task",msg1)
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

            let response=await (0,_apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__.updateTask)({id:id,data:FormData})  
            if(response==="503"){
                (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't Edit the task",msg2)
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
    if(status()){
        (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't complete Task",msg1)
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
                let response=await (0,_apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__.updateTask)({id:id,data:FormData})
                if(response==="503"){
                    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't Complete the task",msg2)
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
                let response=await (0,_apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__.updateTask)({id:id,data:FormData})
                if(response==="503"){
                    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't Complete the task",msg2)
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
        let response=await (0,_apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__.updateTask)({id:id,data:FormData})
        if(response==="503"){
            (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't Complete the task",msg2)
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
    if(status()){
        (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't reset Task",msg1)
        return
    }
    if(confirm("Are you sure you want to delete all task?")){
        let response=await (0,_apicalls_taskapicalls_js__WEBPACK_IMPORTED_MODULE_1__.deleteAll)();
        if(response==="503"){
            (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_2__.modal)("Can't Delete all the tasks",msg2)
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


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
        remove.addEventListener('click',_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.DeleteTask)
        update.addEventListener('click',_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.EditTask)
        taskDesc1.addEventListener('click',_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.CompleteTask)
        return taskDiv

}

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllTasks": () => (/* binding */ getAllTasks),
/* harmony export */   "createTask": () => (/* binding */ createTask),
/* harmony export */   "deleteTaskById": () => (/* binding */ deleteTaskById),
/* harmony export */   "updateTask": () => (/* binding */ updateTask),
/* harmony export */   "deleteAll": () => (/* binding */ deleteAll)
/* harmony export */ });
/* harmony import */ var _apirequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


let url="https://polar-woodland-07461.herokuapp.com/tasks"

let token=localStorage.getItem("token")
const getAllTasks=()=>{
    return (0,_apirequest_js__WEBPACK_IMPORTED_MODULE_0__.apicall)({url:url,obj:{
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
    return (0,_apirequest_js__WEBPACK_IMPORTED_MODULE_0__.apicall)({url:url,obj:obj})

}

const deleteTaskById=(id)=>{
    return (0,_apirequest_js__WEBPACK_IMPORTED_MODULE_0__.apicall)({url:`${url}/${id}`,obj:{method:"DELETE"}})
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
    return (0,_apirequest_js__WEBPACK_IMPORTED_MODULE_0__.apicall)({url:`${url}/${id}`,obj:obj})

}

const deleteAll=()=>{
    return (0,_apirequest_js__WEBPACK_IMPORTED_MODULE_0__.apicall)({url:url,obj:{
        method:"DELETE",
    }})
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apicall": () => (/* binding */ apicall)
/* harmony export */ });


const apicall=async ({url:url,obj={}})=>{
    try{
        let response=await fetch(url,obj);
        let data=await response.json();
        return await data.data
    }catch(error){
        return "503"
  
    }
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modal": () => (/* binding */ modal)
/* harmony export */ });
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

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toggle": () => (/* binding */ Toggle)
/* harmony export */ });
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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskList": () => (/* binding */ TaskList)
/* harmony export */ });
/* harmony import */ var _actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _actions_theme_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _apicalls_apirequest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);



// import "../styles/styles.css";
// import "../styles/media-queries.css";

window.onload=()=>{

  (0,_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.DisplayAllTasks)();

  
}



let theme=document.getElementById("theme")
theme.addEventListener('click',_actions_theme_js__WEBPACK_IMPORTED_MODULE_1__.Toggle)



const TaskList=(event)=>{
  event.preventDefault();
  let taskDesc=document.taskInput.task.value; 
  // check if string has characters in it
  if(!taskDesc.trim().length){
    alert("Enter Task");
    return
  }
    (0,_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(taskDesc)
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
  

})();

/******/ })()
;