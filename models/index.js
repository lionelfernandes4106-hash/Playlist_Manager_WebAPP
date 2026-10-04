const sequelize = require('../db');
const Playlist = require('./Playlist');
const Song = require('./Song');

Playlist.hasMany(Song, { foreignKey: 'playlist_id', onDelete: 'CASCADE' });
Song.belongsTo(Playlist, { foreignKey: 'playlist_id' });

module.exports = { sequelize, Playlist, Song };