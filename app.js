//Define const
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');

const loadEventListener = () => {
  // Add task
  form.addEventListener('submit', addTask);
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

  taskInput.value = '';

  e.preventDefault();
};

loadEventListener();
