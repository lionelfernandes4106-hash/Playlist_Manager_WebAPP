const express = require('express');
const { sequelize } = require('./models');
const playlistRoutes = require('./routes/playlistRoutes');
const songRoutes = require('./routes/songRoutes');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Playlist API is running');
});

app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);

const PORT = 5000;

sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected via Sequelize');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('DB connection failed:', err));