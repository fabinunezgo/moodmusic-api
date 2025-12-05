import PlaylistService from "../services/playlist.service.js";


export const getPlaylists = async (req, res) => {
    const playlists = await PlaylistService.getAll();
    res.json(playlists);
};

export const getPlaylist = async (req, res) => {
    const { id } = req.params;
    const playlist = await PlaylistService.getById(id);

    if (!playlist) {
        return res.status(404).json({ message: "Playlist no encontrada" });
    }

    res.json(playlist);
};

export const createPlaylist = async (req, res) => {
    const nueva = await PlaylistService.create(req.body);
    res.status(201).json(nueva);
};

export const updatePlaylist = async (req, res) => {
    const { id } = req.params;
    const actualizada = await PlaylistService.update(id, req.body);
    res.json(actualizada);
};

export const deletePlaylist = async (req, res) => {
    const { id } = req.params;
    await PlaylistService.delete(id);
    res.json({ message: "Playlist eliminada correctamente" });
};
