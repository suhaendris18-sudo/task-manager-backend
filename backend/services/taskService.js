let tasks = require("../data/taskData");

const getAllTasks = () => tasks;

const getTaskById = (id) => tasks.find((t) => t.id === id);

const addTask = (title, priority) => {
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false,
    priority: priority || "medium",
  };

  tasks.push(newTask);
  return newTask;
};

const deleteTask = (id) => {
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < initialLength;
};

const updateTask = (id, updatedData) => {
  const task = tasks.find((t) => t.id === id);

  if (!task) return null;

  Object.assign(task, updatedData);

  return task;
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  deleteTask,
  updateTask,
};