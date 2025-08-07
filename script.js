let store = [];


// THis is for adding the getting the input from the input from the text when the button is clicked
let docu = document.getElementById("Form")

docu.addEventListener('submit',function(event){

    event.preventDefault();
    addTask();

});

//This is for adding the listener to the reset button 
let but = document.getElementById("reset")

but.addEventListener('click',function(event){
    
    event.preventDefault();
    resetTask();
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


 //This function is for resetting the entire Tasks 

 function resetTask(){
    store.length = 0;
    renderTasks();
 };


const apiQuoteURL = "https://api.quotable.io/random";

async function getapi(apiQuoteURL){
    try {
        let response = await fetch(apiQuoteURL);
        let data = await response.json();
        let quote = document.getElementById("quote");
        quote.innerHTML = `"${data.content}" - ${data.author}`;
    }
    catch(error) {
        console.error("Error while fetching quote:", error);
        document.getElementById("quote").innerHTML = "Failed to load the Quote.";
    }
}

getapi(apiQuoteURL);




// This block is for making the timer app 

let duration = 25*60;
let timer;
let isRunning = false;

// Pomodoro (25 mins)
function setPomodoro() {
    duration = 25 * 60;
    clearInterval(timer);
    isRunning = false;
    updateDisplay();
}

// Short Break (5 mins)
function ShortBreak() {
    duration = 5 * 60;
    clearInterval(timer);
    isRunning = false;
    updateDisplay();
}

// Long Break (15 mins)
function LongBreak() {
    duration = 15 * 60;
    clearInterval(timer);
    isRunning = false;
    updateDisplay();
}

// Start Button
function startButton() {
    if (!isRunning && duration > 0) {
        isRunning = true;
        timer = setInterval(() => {
            if (duration > 0) {
                duration = duration - 1;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
            }
        }, 1000);
    }
}

// Resume Button
function pauseResumeButton() {
    const button = document.getElementById("buttResume");

    if (isRunning) {
        // Pause
        clearInterval(timer);
        isRunning = false;
        button.textContent = "Resume";
    } else {
        // Resume
        if (duration > 0) {
            isRunning = true;
            timer = setInterval(() => {
                if (duration > 0) {
                    duration--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    button.textContent = "Pause";
                }
            }, 1000);
            button.textContent = "Pause";
        }
    }
}

// Timer display
function updateDisplay() {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');
    document.getElementById("timer").textContent = `${formattedMinutes}:${formattedSeconds}`;
}


document.getElementById("focus").addEventListener("click", setPomodoro);
document.getElementById("shortBreak").addEventListener("click", ShortBreak);
document.getElementById("longBreak").addEventListener("click", LongBreak);
document.getElementById("buttStart").addEventListener("click", startButton);
document.getElementById("buttResume").addEventListener("click", pauseResumeButton);
