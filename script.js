const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function showTask() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    listContainer.innerHTML = ""; 

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("checked");
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}


function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push({ text: inputBox.value, completed: false });

    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    inputBox.value = "";
    showTask();
}


listContainer.addEventListener("click", function(e) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        const index = Array.from(listContainer.children).indexOf(e.target);
        savedTasks[index].completed = !savedTasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    } else if (e.target.tagName === "SPAN") {
        // Remove task
        const index = Array.from(listContainer.children).indexOf(e.target.parentElement);
        savedTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        showTask();
    }
});


inputBox.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        addTask();
    }
});


showTask();
