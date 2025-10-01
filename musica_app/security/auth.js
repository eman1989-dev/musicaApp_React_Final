const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
    // Obtener token del header Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token invalido o expirado' });
    }
}


module.exports = {verificarToken};