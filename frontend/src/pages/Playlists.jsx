import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlaylists, createPlaylist, deletePlaylist, updatePlaylist } from '../api/api';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const loadPlaylists = async () => {
    const res = await getPlaylists();
    setPlaylists(res.data);
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      await updatePlaylist(editingId, { name, description });
      setEditingId(null);
    } else {
      await createPlaylist({ name, description });
    }

    setName('');
    setDescription('');
    loadPlaylists();
  };

  const handleEdit = (playlist) => {
    setEditingId(playlist.id);
    setName(playlist.name);
    setDescription(playlist.description || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this playlist and all its songs?')) {
      await deletePlaylist(id);
      loadPlaylists();
    }
  };

  return (
<div className="page-container">
  <h1> Personal Playlist</h1><br></br>

  <form onSubmit={handleSubmit} className="form-card">
    <div className="form-row">
      <input type="text" placeholder="Playlist name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
    </div>
    <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add Playlist'}</button>
  </form>

  {playlists.length === 0 && <p className="empty-state">No playlists yet. Create one above.</p>}

  {playlists.map((p) => (
    <div key={p.id} className="card">
      <h3 className="card-title"><Link to={`/playlist/${p.id}`}>{p.name}</Link></h3>
      <p className="card-description">{p.description}</p>
      <div className="card-actions">
        <button className="btn-edit" onClick={() => handleEdit(p)}>Edit</button>
        <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
      </div>
    </div>
  ))}
</div>
  );
}

export default Playlists;