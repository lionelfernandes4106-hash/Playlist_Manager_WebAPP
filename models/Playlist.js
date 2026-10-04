const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Playlist = sequelize.define('Playlist', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'playlists',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Playlist;