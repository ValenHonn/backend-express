import TaskService from "../services/tasksService.js";

const taskService = new TaskService();

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.id); // tengo req.user porque lo guarde en el middleware
    return res.status(200).json(tasks);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = await taskService.createTask(
      req.user.id,
      title,
      description,
      date
    );

    return res.status(201).json(newTask);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await taskService.getTask(req.user.id, req.params.id);
    return res.status(200).json(task);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.user.id, req.params.id);
    return res.status(200).json(task);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.user.id, req.params.id, req.body);
    return res.status(200).json(task);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};

export default {getTask, createTask, getTasks, updateTask, deleteTask}