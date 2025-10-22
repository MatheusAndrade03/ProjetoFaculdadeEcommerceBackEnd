const mongoose = require('mongoose');
const logger = require('./logger');

const MONGO_URI = 'mongodb://127.0.0.1:27017/ecommerce';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('✅ MongoDB conectado: ' + MONGO_URI);
  } catch (err) {
    logger.error('❌ Erro ao conectar no MongoDB: ' + err.message);
    throw err;
  }
}

module.exports = connectDB;
