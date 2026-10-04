import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPlaylists = () => axios.get(`${API_URL}/playlists`);
export const getPlaylist = (id) => axios.get(`${API_URL}/playlists/${id}`);
export const createPlaylist = (data) => axios.post(`${API_URL}/playlists`, data);
export const updatePlaylist = (id, data) => axios.put(`${API_URL}/playlists/${id}`, data);
export const deletePlaylist = (id) => axios.delete(`${API_URL}/playlists/${id}`);

export const createSong = (data) => axios.post(`${API_URL}/songs`, data);
export const updateSong = (id, data) => axios.put(`${API_URL}/songs/${id}`, data);
export const deleteSong = (id) => axios.delete(`${API_URL}/songs/${id}`);