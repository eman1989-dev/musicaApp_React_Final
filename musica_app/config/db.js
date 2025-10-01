const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.DB_HOST;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { tls: true });
    console.log("✅ Conectado a la base de datos exitosamente!");
  } catch (err) {
    console.error("❌ Error de conexión a la base de datos:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

