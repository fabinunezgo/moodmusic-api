import PlaylistCancionService from "../services/playlistCancion.service.js";
import PlaylistService from "../services/playlist.service.js";

export const addSongToPlaylist = async (req, res) => {
  try {
    const usuario_id = req.user?.id;
    if (!usuario_id) return res.status(401).json({ message: "No autenticado" });

    const { playlist_id, cancion_id } = req.body;
    if (!playlist_id || !cancion_id) {
      return res.status(400).json({ message: "playlist_id y cancion_id son obligatorios" });
    }

    // Verificar que la playlist existe y pertenece al usuario
    const playlist = await PlaylistService.getById(playlist_id);
    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });
    if (playlist.usuario_id !== usuario_id) {
      return res.status(403).json({ message: "No autorizado para modificar esta playlist" });
    }

    const nueva = await PlaylistCancionService.addSong(playlist_id, cancion_id);
    res.status(201).json({ success: true, message: "Canción agregada a la playlist correctamente", data: nueva });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error agregando canción a la playlist", error: error.message });
  }
};

export const getSongsFromPlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.params;
    if (!playlist_id) return res.status(400).json({ message: "playlist_id es obligatorio" });

    const canciones = await PlaylistCancionService.getSongsByPlaylist(playlist_id);
    res.json(canciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo canciones", error: error.message });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const usuario_id = req.user?.id;
    if (!usuario_id) return res.status(401).json({ message: "No autenticado" });

    const { id } = req.params;
    // Verificar que la relación exista y que la playlist pertenezca al usuario
    const relacion = await PlaylistCancionService.findRelationById(id);
    if (!relacion) return res.status(404).json({ message: "Relación no encontrada" });

    const playlist = await PlaylistService.getById(relacion.playlist_id);
    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });
    if (playlist.usuario_id !== usuario_id) return res.status(403).json({ message: "No autorizado" });

    const removed = await PlaylistCancionService.removeSong(id);
    if (!removed) return res.status(404).json({ message: "No se pudo eliminar la canción de la playlist" });

    res.json({ message: "Canción eliminada de la playlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando canción de la playlist", error: error.message });
  }
};
