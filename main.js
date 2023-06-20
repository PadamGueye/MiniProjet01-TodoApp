const modalContainer = document.querySelector(".modalAll");
const modal= document.querySelectorAll(".modal");

let form = document.querySelector("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let desc = document.getElementById("desc");
let add = document.querySelector(".submit");
let tasks = document.getElementById("allTask");

modal.forEach(elem =>elem.addEventListener("click",toggleModal));
function toggleModal(){
    modalContainer.classList.toggle("active");
}
var data =[];


let acceptData =()=>{
    data.push(
        {titre : textInput.value,
        date: dateInput.value,
        description : desc.value}
    );
    localStorage.setItem("data",JSON.stringify(data));
    createTask();
};

let resetForm=() =>{
    textInput.value="";
    dateInput.value="";
    desc.value="";
}

let createTask= ()=>{
    tasks.innerHTML="";
    data.map((x) =>{
        tasks.innerHTML+=
        `<div class="task">
            <div class="sup">
                <div class="titreA">${x.titre}</div>
                <div class="dateA">${x.date}</div>
            </div>
            <div class="descA">${x.description}</div>     
            <div class="inf">
                <i onClick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
                <i onClick="editTask(this)" class="modal fa-solid fa-pen-to-square"></i>
            </div>
        </div>`
    });
    resetForm();
}

let deleteTask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data",data);
}

let editTask=(e)=>{
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].children[0].innerHTML;
    dateInput.value = selectedTask.children[0].children[1].innerHTML;
    desc.value = selectedTask.children[1].innerHTML;
    deleteTask(e);
    modalContainer.classList.toggle("active");
}

if(localStorage.length != 0){
    data = JSON.parse(localStorage.getItem("data"));
    createTask();
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    acceptData();
});


console.log(JSON.stringify(data));
console.log(data);
console.log(JSON.parse(localStorage.getItem("data")));


