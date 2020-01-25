//Define const
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');

const loadEventListener = () => {
  // Add task
  form.addEventListener('submit', addTask);
  // Remove task
  taskList.addEventListener('click', removeTask);
  // Clear task
  clearBtn.addEventListener('click', clearTasks);
};

// Add task
const addTask = (e) => {
  if(taskInput.value === '') {
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
  if(localStorage.getItem('tasks') === null) {
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
      e.target.parentElement.parentElement.remove()
    }

  }
};

//Clear tasks
const  clearTasks = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
};


loadEventListener();
