import Task from "../models/tasksModel.js";

class TaskService {
  async getTasks(userId) {
    try {
      const tasks = await Task.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async createTask(userId, title, description, date) {
    try {
      const newTask = await Task.create({
        title,
        description,
        date,      // si no mandás date, el modelo usa defaultValue: NOW
        userId,
      });

      return newTask;
    } catch (error) {
      throw error;
    }
  }

  async getTask(userId, taskId) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        const err = new Error("Task not found");
        err.statusCode = 404;
        throw err;
      }

      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(userId, taskId) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        const err = new Error("Task not found");
        err.statusCode = 404;
        throw err;
      }

      await task.destroy();
      return task;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(userId, taskId, data) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        const err = new Error("Task not found");
        err.statusCode = 404;
        throw err;
      }

      await task.update(data);
      return task;
    } catch (error) {
      throw error;
    }
  }
}

export default TaskService;