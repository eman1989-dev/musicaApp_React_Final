const multer = require('multer');
const path = require('path');

// Carpeta donde se guardarán las imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Ajusta según tu carpeta
    },
    filename: function (req, file, cb) {
        // Renombrar archivo: portada-timestamp.ext
        const ext = path.extname(file.originalname);
        cb(null, 'portada-' + Date.now() + ext);
    }
});

// Filtrar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;