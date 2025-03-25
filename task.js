class Task {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = "Pending";
    }
}

class TaskManager {
    constructor() {
        this.taskNameInput = document.getElementById("taskName");
        this.taskDescriptionInput = document.getElementById("taskDescription");
        this.taskDueDateInput = document.getElementById("taskDueDate");
        this.addTaskBtn = document.getElementById("addTaskBtn");
        this.filterStatus = document.getElementById("filterStatus");
        this.sortByDueDateBtn = document.getElementById("sortByDueDate");
        this.searchTaskInput = document.getElementById("searchTask");
        this.taskList = document.getElementById("taskList");
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.addTaskBtn.addEventListener("click", () => this.addTask());
        this.filterStatus.addEventListener("change", () => this.loadTasks());
        this.sortByDueDateBtn.addEventListener("click", () => this.sortByDueDate());
        this.feedback = document.getElementById("feedback");
        this.searchTaskInput.addEventListener("input", () => this.loadTasks());
        this.loadTasks();
    }

    loadTasks() {
        this.taskList.innerHTML = "";
        const filter = this.filterStatus.value;
        const searchQuery = this.searchTaskInput.value.toLowerCase();
        this.tasks.filter(task => filter === "all" || task.status === filter && 
            task.name.toLowerCase().includes(searchQuery)
        ).forEach((taskData, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td contenteditable="false">${taskData.name}</td>
                <td contenteditable="false">${taskData.description}</td>
                <td><input type="date" value="${taskData.dueDate}" disabled></td>
                <td>${taskData.status}</td>
                <td>
                    <button onclick="taskManager.toggleEditTask(${index}, this)">Edit</button>
                    <button onclick="taskManager.changeStatus(${index})">Toggle Status</button>
                    <button onclick="taskManager.deleteTask(${index})">Delete</button>
                </td>
            `;
            this.taskList.appendChild(row);
        });
    }

    addTask() {
        const name = this.taskNameInput.value.trim();
        const description = this.taskDescriptionInput.value.trim();
        const dueDate = this.taskDueDateInput.value;
        if (!name || !description || !dueDate) {
            this.feedback.textContent = "All fields are required!";
            return;
        }
        const newTask = new Task(name, description, dueDate);
        this.tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.taskNameInput.value = "";
        this.taskDescriptionInput.value = "";
        this.taskDueDateInput.value = "";
        this.feedback.textContent = "Task added successfully!";
        this.loadTasks();
    
    }

    toggleEditTask(index, button) {
        const row = button.closest("tr");
        const cells = row.querySelectorAll("td");
        const inputDate = row.querySelector("input[type='date']");
        
        if (button.textContent === "Edit") {
            cells[0].setAttribute("contenteditable", "true");
            cells[1].setAttribute("contenteditable", "true");
            inputDate.removeAttribute("disabled");
            button.textContent = "Save";
        } else {
            this.tasks[index].name = cells[0].textContent.trim();
            this.tasks[index].description = cells[1].textContent.trim();
            this.tasks[index].dueDate = inputDate.value;
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            cells[0].setAttribute("contenteditable", "false");
            cells[1].setAttribute("contenteditable", "false");
            inputDate.setAttribute("disabled", "true");
            button.textContent = "Edit";
        }
    }

    changeStatus(index) {
        this.tasks[index].status = this.tasks[index].status === "Pending" ? "Completed" : "Pending";
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.loadTasks();
        this.feedback.textContent = "Task status changed!";
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.loadTasks();
        this.feedback.textContent = "Task deleted successfully!";
    
    }

    sortByDueDate() {
        this.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.loadTasks();
        this.feedback.textContent = "Tasks sorted by due date!";
    }
}

const taskManager = new TaskManager();