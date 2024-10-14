

//varibles

const inputBox =document.getElementById("input-Box");
const taskList =document.getElementById("taskList");


document.addEventListener('DOMContentLoaded', loadTasks);

function newTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === "") {
        alert("You must write something!");
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskInput.value;

    const span = document.createElement('span');
    span.textContent = '\u00D7'; // Unicode for "×" (close symbol)
    span.onclick = function() {
        const parent = this.parentElement;
        taskList.removeChild(parent);
        saveTasks();
    };

    li.appendChild(span);
    taskList.appendChild(li);

    li.onclick = function() {
        this.classList.toggle('checked');
        
    };

    saveTasks();
    taskInput.value = "";
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;
    for (let task of taskList) {
        tasks.push({
            text: task.textContent.slice(0, -1), // remove the close button text
            checked: task.classList.contains('checked')
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        for (let task of tasks) {
            const li = document.createElement('li');
            li.textContent = task.text;

            const span = document.createElement('span');
            span.textContent = '\u00D7'; 
            span.onclick = function() {
                const parent = this.parentElement;
                parent.style.display = "none";
                saveTasks();
            };

            li.appendChild(span);
            if (task.checked) {
                li.classList.add('checked');
            }
            li.onclick = function() {
                this.classList.toggle('checked');
                saveTasks();
            };

            document.getElementById('taskList').appendChild(li);
        }
    }
}