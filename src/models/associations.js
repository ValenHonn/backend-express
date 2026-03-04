import User from "./userModel.js";
import Task from "./tasksModel.js";

// relaciones
User.hasMany(Task, {
  foreignKey: "userId",
  sourceKey: "id",
});

Task.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

export { User, Task };