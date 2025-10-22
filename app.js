const connectDB = require('./src/database');
const menu = require('./src/menu');
const logger = require('./src/logger');

(async () => {
  try {
    await connectDB();
    logger.info('🚀 Conexão com o banco estabelecida.');
    await menu();
    logger.info('Aplicação finalizada.');
    process.exit(0);
  } catch (err) {
    logger.error('Erro na aplicação: ' + err.message);
    console.error(err);
    process.exit(1);
  }
})();
