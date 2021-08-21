export const Toggle=(event)=>{
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