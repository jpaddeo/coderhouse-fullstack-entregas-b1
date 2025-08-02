import mongoose from 'mongoose';

import CONFIG from './config.js';

export const dbConnection = () => {
  const dbConnection = mongoose.connection;
  if (dbConnection.readyState === 0) {
    console.log(
      '[DB] - Conexión a MongoDB no establecida, intentando conectar...'
    );
    mongoose
      .connect(CONFIG.MONGODB_URI)
      .then(() => {
        console.log('[DB] - Conexión a MongoDB exitosa.');
      })
      .catch((err) => {
        console.error('[DB] - Error al conectar a MongoDB:', err);
      });
  } else {
    console.log('[DB] - Conexión a MongoDB ya establecida o por establecerse.');
  }
  return dbConnection;
};
