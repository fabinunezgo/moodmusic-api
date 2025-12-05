import { PlaylistCancion } from "../models/playlistCancion.js";

export const playlistCancionService = {

  async addRelation(playlist_id, cancion_id) {
    return await PlaylistCancion.addSong(playlist_id, cancion_id);
  },

  async getRelationsByPlaylist(playlist_id) {
    return await PlaylistCancion.findSongsByPlaylist(playlist_id);
  },

  async getAllRelations() {
    return await PlaylistCancion.getAllRelations();
  },

  async deleteRelation(id) {
    return await PlaylistCancion.removeSong(id);
  }
};
