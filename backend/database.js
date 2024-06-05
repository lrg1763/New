const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Создаем соединение с базой данных SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'feedback.sqlite')
});

// Определяем модель для отзывов
const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Синхронизируем модели с базой данных
sequelize.sync();

module.exports = Feedback;
