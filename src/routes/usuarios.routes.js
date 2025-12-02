const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// Obtener todos los usuarios
router.get("/", usuariosController.obtenerUsuarios);

// Crear usuario
router.post("/crear", usuariosController.crearUsuario);

// Actualizar usuario
router.put("/actualizar/:id", usuariosController.actualizarUsuario);

// Eliminar usuario
router.delete("/eliminar/:id", usuariosController.eliminarUsuario);

module.exports = router;
