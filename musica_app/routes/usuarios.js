const express = require('express');
const router = express();
const usuarioController = require('../controllers/usuarioController');
const {verificarToken} = require('../security/auth');

router.get('/', verificarToken, usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.post('/login', usuarioController.login);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;