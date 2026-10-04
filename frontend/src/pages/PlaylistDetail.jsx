import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlaylist, createSong, updateSong, deleteSong } from '../api/api';


function PlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [form, setForm] = useState({
    title: '', artist: '', genre: '', mood: '', rating: '', description: ''
  });
  const [editingId, setEditingId] = useState(null);

  const loadPlaylist = async () => {
    const res = await getPlaylist(id);
    setPlaylist(res.data);
  };

  useEffect(() => {
    loadPlaylist();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.artist.trim()) return;

    const songData = { ...form, rating: Number(form.rating), playlist_id: id };

    if (editingId) {
      await updateSong(editingId, songData);
      setEditingId(null);
    } else {
      await createSong(songData);
    }

    setForm({ title: '', artist: '', genre: '', mood: '', rating: '', description: '' });
    loadPlaylist();
  };

  const handleEdit = (song) => {
    setEditingId(song.id);
    setForm({
      title: song.title,
      artist: song.artist,
      genre: song.genre || '',
      mood: song.mood || '',
      rating: song.rating || '',
      description: song.description || '',
    });
  };

  const handleDelete = async (songId) => {
    if (window.confirm('Delete this song?')) {
      await deleteSong(songId);
      loadPlaylist();
    }
  };

  if (!playlist) return <p className="loading">Loading...</p>;

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← Back to Playlists</Link>
      <h1>{playlist.name}</h1>
      <p className="page-subtitle">{playlist.description}</p>

      <h2>{editingId ? 'Edit Song' : 'Add a Song'}</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-row">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <input name="artist" placeholder="Artist" value={form.artist} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
          <input name="mood" placeholder="Mood" value={form.mood} onChange={handleChange} />
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            value={form.rating}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="description"
          placeholder="Description / notes"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit" className="btn-primary">
          {editingId ? 'Update Song' : 'Add Song'}
        </button>
      </form>

      <h2>Songs</h2>
      {(!playlist.Songs || playlist.Songs.length === 0) && (
        <p className="empty-state">No songs yet. Add one above.</p>
      )}

      {playlist.Songs &&
        playlist.Songs.map((song) => (
          <div key={song.id} className="card">
            <h3 className="card-title">{song.title} — {song.artist}</h3>
            <p className="card-meta">
              <span>Genre: {song.genre || '—'}</span>
              <span>Mood: {song.mood || '—'}</span>
              <span className="rating">{'⭐'.repeat(song.rating || 0)}</span>
            </p>
            <p className="card-description">{song.description}</p>
            <div className="card-actions">
              <button className="btn-edit" onClick={() => handleEdit(song)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(song.id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PlaylistDetail;