const express = require('express');
const router = express.Router();
const { Song } = require('../models');

// CREATE song
router.post('/', async (req, res) => {
  try {
    const { title, artist, genre, mood, rating, description, playlist_id } = req.body;
    const song = await Song.create({ title, artist, genre, mood, rating, description, playlist_id });
    res.status(201).json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE song
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });

    const { title, artist, genre, mood, rating, description } = req.body;
    song.title = title ?? song.title;
    song.artist = artist ?? song.artist;
    song.genre = genre ?? song.genre;
    song.mood = mood ?? song.mood;
    song.rating = rating ?? song.rating;
    song.description = description ?? song.description;
    await song.save();

    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });

    await song.destroy();
    res.json({ message: 'Song deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;