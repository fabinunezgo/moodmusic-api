import PlaylistService from "../services/playlist.service.js";

export const getPlaylists = async (req, res) => {
  try {
    const userId = req.user?.id;
    const playlists = userId
      ? await PlaylistService.getByUser(userId)
      : await PlaylistService.getAll();

    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo playlists", error: error.message });
  }
};

export const getPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await PlaylistService.getById(id);

    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });

    res.json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo la playlist", error: error.message });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    // req.user viene del authMiddleware
    const usuario_id = req.user?.id;
    if (!usuario_id) return res.status(401).json({ message: "No autenticado" });

    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ message: "El nombre de la playlist es obligatorio" });

    const nueva = await PlaylistService.create({ nombre, descripcion, usuario_id });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando la playlist", error: error.message });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user?.id;
    const playlist = await PlaylistService.getById(id);
    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });
    if (playlist.usuario_id !== usuario_id) return res.status(403).json({ message: "No autorizado" });

    const actualizada = await PlaylistService.update(id, req.body);
    res.json(actualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando playlist", error: error.message });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user?.id;
    const playlist = await PlaylistService.getById(id);
    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });
    if (playlist.usuario_id !== usuario_id) return res.status(403).json({ message: "No autorizado" });

    await PlaylistService.delete(id);
    res.json({ message: "Playlist eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando playlist", error: error.message });
  }
};
