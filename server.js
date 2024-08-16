// app.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB, sequelize } from '../api/src/config/db.js';


import publicRoutes from '../api/src/routes/publicRoutes.js' 
import adminRoutes from '../api/src/routes/adminRoutes.js' 
import userRoutes from '../api/src/routes/userRoutes.js' 

import{ authMiddleware, authorize } from './src/middleware/auth.js';

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para parsear el body de las requests
app.use(express.json());

// Usar las rutas de usuario
app.use('/api/public', publicRoutes);
app.use('/api/admin',authMiddleware,authorize(['administrador']), adminRoutes);
app.use('/api/user',authMiddleware,authorize(['usuario']), userRoutes);

// Sincronizar modelos con la base de datos y arrancar el servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});
