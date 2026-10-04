const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  genre: DataTypes.STRING(50),
  mood: DataTypes.STRING(50),
  rating: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 },
  },
  description: DataTypes.STRING(500),
}, {
  tableName: 'songs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Song;