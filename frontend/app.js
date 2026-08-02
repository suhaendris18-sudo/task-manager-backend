const API_URL = 'http://localhost:5000/api/tasks';
const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
}
function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>
        <strong>${task.title}</strong> (${task.priority})
        <p>Status: ${task.completed ? "Completed" : "Not completed"}</p>
      </span>
      <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
      <button class="task-btn complete-btn" onclick="completeTask(${task.id}, ${task.completed})">
    ${task.completed ? "Undo" : "Complete"}
</button>
    `;
    taskList.appendChild(li);
  });
}
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newTask = {
    title: titleInput.value,
    priority: priorityInput.value,
    completed: false
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    if (res.ok) {
      titleInput.value = '';
      fetchTasks(); 
    }
  } catch (err) {
    console.error('Error adding task:', err);
  }
});
async function deleteTask(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      fetchTasks(); 
    }
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}
async function completeTask(id, completed) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        completed: !completed,
      }),
    });

    if (response.ok) {
      fetchTasks();
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

fetchTasks();