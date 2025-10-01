const express = require('express');
const router = express.Router();
const multer = require('multer');
const cancionController = require('../controllers/cancionController');
const {verificarToken} = require('../security/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/',verificarToken, cancionController.getCanciones);
router.get('/:id', verificarToken, cancionController.getCancionById);
router.post('/', verificarToken, upload.single('portada'), cancionController.createCancion);
router.put('/:id', verificarToken, upload.single('portada'), cancionController.updateCancion);
router.put('/vota/:id', cancionController.calificarCancion);
router.delete('/:id', verificarToken, cancionController.deleteCancion);

module.exports = router;
