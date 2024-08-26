let draggingElement = null;
let taskCounter = 1;

// Function to add a new task

function addTask(columnId) {
    const column = document.getElementById(columnId);
    const taskTitle = prompt("Enter task title:");
    if (taskTitle) {
        const task  = document.createElement("div");
        task.className = "task";
        task.draggable = true;
        task.innerHTML = `
        <div class="task-id">TASK-${taskCounter}</div>
        <div class="task-title">${taskTitle}</div>
        <div class="task-assigned">Assigned to: User</div>
    `;
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
    column.insertBefore(task, column.lastElementChild);
    taskCounter++;
    updateAllColumnIndicators()
    }
}

function dragStart(e) {
    draggingElement = e.target;
    e.target.classList.add('dragging');
    setTimeout(() => e.target.style.display = 'none', 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
    e.target.style.display = 'block';
    updateAllColumnIndicators()
}

document.querySelectorAll('.column').forEach(column => {
    column.addEventListener("dragover", e => {
        e.preventDefault();
        const task = document.querySelector('.dragging');
        column.insertBefore(task, column.lastElementChild);
    });
})

function updateColumnIndicator(column) {
    const indicator = column.querySelector('.column-indicator');
    const tasks = column.querySelectorAll('.task').length;
    const width = Math.min(tasks * 10, 100);
    indicator.style.width = `${width}%`;
}


function updateAllColumnIndicators() {
    document.querySelectorAll('.column').forEach(updateColumnIndicator)
}

updateAllColumnIndicators();