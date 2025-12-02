const Usuarios = require("../models/Usuarios");

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener usuarios" });
    }
};

// Crear usuario
exports.crearUsuario = async (req, res) => {
    const { nombre, email, estado } = req.body;

    try {
        const nuevoUsuario = await Usuarios.create({
            nombre,
            email,
            estado
        });

        res.json({
            msg: "Usuario creado correctamente",
            usuario: nuevoUsuario,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear usuario" });
    }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, estado } = req.body;

    try {
        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.email = email || usuario.email;
        usuario.estado = estado !== undefined ? estado : usuario.estado;

        await usuario.save();

        res.json({
            msg: "Usuario actualizado correctamente",
            usuario,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar usuario" });
    }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        await usuario.destroy();

        res.json({ msg: "Usuario eliminado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar usuario" });
    }
};
