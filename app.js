//Define const
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

const loadEventListener = () => {
    // DOM load
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear task
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
};

// Get tasks from LS
const getTasks = () => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const removeTask = document.createElement('a');
        removeTask.className = 'delete-item secondary-content';
        removeTask.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(removeTask);

        taskList.appendChild(li);
    })
};


// Add task
const addTask = (e) => {
    if (taskInput.value === '') {
        return alert('Pls, add a task')
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const removeTask = document.createElement('a');
    removeTask.className = 'delete-item secondary-content';
    removeTask.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(removeTask);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
};

// Store task
const storeTaskInLocalStorage = (task) => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Remove task
const removeTask = (e) => {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            // Remove from DOM
            e.target.parentElement.parentElement.remove()
            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

    }
};

// Remove task from LocalStorage
const removeTaskFromLocalStorage = (taskItem) => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
};

//Clear tasks
const clearTasks = () => {
    // Clear from DOM
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    // Clear from LS
    clearTasksFromLocalStorage();
};

// Clear tasks from LS
const clearTasksFromLocalStorage = () => {
    localStorage.clear();
};

// Filter tasks
const filterTasks = (e) => {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
};

loadEventListener();