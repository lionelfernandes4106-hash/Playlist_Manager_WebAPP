const express = require('express');
const router = express.Router();
const { Playlist, Song } = require('../models');

 //all songs
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//find each
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: Song,
    });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new.
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const playlist = await Playlist.create({ name, description });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PLAYlist 
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    playlist.name = name ?? playlist.name;
    playlist.description = description ?? playlist.description;
    await playlist.save();

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete playlist
router.delete('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    await playlist.destroy();
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;