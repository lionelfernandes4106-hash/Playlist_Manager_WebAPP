import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Playlists from './pages/Playlists';
import PlaylistDetail from './pages/PlaylistDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playlists />} />
        <Route path="/playlist/:id" element={<PlaylistDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;