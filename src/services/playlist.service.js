import pool from '../config/db.js';

const PlaylistService = {
    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT * FROM playlists
        `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query(`
            SELECT * FROM playlists WHERE id = ?
        `, [id]);
        return rows[0];
    },

    create: async ({ nombre, descripcion, usuario_id }) => {
        const [result] = await pool.query(`
            INSERT INTO playlists (nombre, descripcion, usuario_id)
            VALUES (?, ?, ?)
        `, [nombre, descripcion, usuario_id]);

        return { id: result.insertId, nombre, descripcion, usuario_id };
    },

    update: async (id, { nombre, descripcion }) => {
        await pool.query(`
            UPDATE playlists SET nombre = ?, descripcion = ?
            WHERE id = ?
        `, [nombre, descripcion, id]);

        return { id, nombre, descripcion };
    },

    delete: async (id) => {
        await pool.query(`DELETE FROM playlists WHERE id = ?`, [id]);
        return { message: "Playlist eliminada correctamente" };
    }
};

export default PlaylistService;
