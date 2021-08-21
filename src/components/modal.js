let errordiv=document.getElementById("error")
export const modal=(msg,msg1)=>{
    let p=document.createElement("p");
    let big=document.createElement("span");
    p.innerText=`${msg}. ${msg1}`;
    p.style.margin="10px"
    p.style.color="red";
    p.style.fontSize="1.2rem"
    errordiv.appendChild(p)
}