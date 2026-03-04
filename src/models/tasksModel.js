import { DataTypes } from "sequelize";
import sequelize from '../../config/database.js';

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING, // en el video es String; si querés texto largo: DataTypes.TEXT
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // equivalente a Date.now
    },

    // En el video después se asocia al usuario en controllers (user: req.user.id).
    // En SQL esto tiene que existir como FK:
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;