import * as PlaylistCancionService from "../services/playlistCancion.service.js";

export const addSongToPlaylist = async (req, res) => {
    const nueva = await PlaylistCancionService.addSong(req.body);
    res.status(201).json(nueva);
};

export const getSongsFromPlaylist = async (req, res) => {
    const { playlist_id } = req.params;
    const canciones = await PlaylistCancionService.getSongsByPlaylist(playlist_id);
    res.json(canciones);
};

export const removeSongFromPlaylist = async (req, res) => {
    const { id } = req.params;
    await PlaylistCancionService.removeSong(id);
    res.json({ message: "Canción eliminada de la playlist" });
};
