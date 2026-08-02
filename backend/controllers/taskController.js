const taskService = require('../services/taskService');
const getAll = (req, res) => {
  const result = taskService.getAllTasks();
  res.json(result);
};
const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const task = taskService.getTaskById(id);
  if (!task) {return res.status(404).json({ message: 'Task not found' });}
  res.json(task);
};
const create = (req, res) => {
  const { title, priority } = req.body;
  if (!title) {return res.status(400).json({ message: 'Title is required' });}


  const newTask = taskService.addTask(title, priority);
  res.status(201).json(newTask);
};


const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = taskService.deleteTask(id);
  if (!deleted) {return res.status(404).json({ message: 'Task not found' }); }
  res.json({ message: 'Task deleted successfully' });
};

const updatetask = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const updatedTask = taskService.updateTask(id, updatedData);

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(updatedTask);
};
module.exports = { getAll,getOne,create,remove,updatetask};