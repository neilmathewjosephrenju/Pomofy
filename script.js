let store = [];


// THis is for adding the getting the input from the input from the text when the button is clicked
let docu = document.getElementById("Form")

docu.addEventListener('submit',function(event){

    event.preventDefault();
    addTask();

});

function renderTasks(){
    let TASK = document.getElementById("tasklist");
    TASK.innerHTML='';
    for (let Taskobject of store){
        let t = document.createElement("li");
        t.textContent = Taskobject.ToDo;
        TASK.appendChild(t);
    }

};








// This function is for adding the function
function addTask(){
    let task = document.getElementById("giveTask").value.trim(); // this remvoes all the trailing spaces by using the trimn() function and we can get the input from the forms

    // Checks if the Task is empty or not, if its empty then we aler the person and returns
    if (task ===" "){
        alert("The Task is Empty! Add some Task.");
        return;
    }


    // This one add a new task using the ID and makes the completed Task as false
    const Tasklist = {
        id : Date.now(),
        ToDo: task,
        completed: false
    };

    // Pushes the task into the Array Store
    store.push(Tasklist);

    // calling renderTasks() consistently whenever your data changes, you ensure that your UI stays synchronized with your JavaScript data.
    renderTasks(task);

    // And now we need to clear the input from the box 
    document.getElementById("giveTask").value = '';

}