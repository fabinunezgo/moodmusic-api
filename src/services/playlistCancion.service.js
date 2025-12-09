import { PlaylistCancion } from "../models/PlaylistCancion.js";

const addSong = async (playlist_id, cancion_id) => {
  return await PlaylistCancion.addSong(playlist_id, cancion_id);
};

const getSongsByPlaylist = async (playlist_id) => {
  return await PlaylistCancion.findSongsByPlaylist(playlist_id);
};

const removeSong = async (id) => {
  return await PlaylistCancion.removeSong(id);
};

const findRelationById = async (id) => {
  const rows = await PlaylistCancion.getAllRelations();
  return rows.find(r => r.id === Number(id)) || null;
};

export default {
  addSong,
  getSongsByPlaylist,
  removeSong,
  findRelationById
};
