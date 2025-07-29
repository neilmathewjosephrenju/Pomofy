let store = [];


// THis is for adding the getting the input from the input from the text when the button is clicked
let docu = document.getElementById("Form")

docu.addEventListener('submit',function(event){

    event.preventDefault();
    addTask();

});









// This function helpos in clearing the visual part of the display and then iterating the Master list to display the updated the tasks 
function renderTasks(){
    let TASK = document.getElementById("tasklist");
    TASK.innerHTML='';
    for (let Taskobject of store){
        let t = document.createElement("li");
        t.dataset.id = Taskobject.id;
        t.textContent = Taskobject.ToDo;

        //
        if (Taskobject.completed){
            t.classList.add('completed');

        };

        //Checking if the user clicks on the task to strike it out
        t.addEventListener('click',function(event){
            strikeTask(Taskobject.id)
        });

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



// This function is for striking out the element in the board
 function strikeTask(id){

    for (let Taskobject of store){

        if (id === Taskobject.id){
            Taskobject.completed=!Taskobject.completed;
        };
    };
    renderTasks();

 };