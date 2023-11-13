const { Sequelize, Model, DataTypes } = require('sequelize');
const database = require('../Database/db')

const Todo = database.define(
  'Todos',
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  },
);

(async () => {
  try {
    await database.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
})();

module.exports = Todo;
