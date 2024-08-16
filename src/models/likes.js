import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Receta from './list.js';
import Usuario from './user.js';


const Likes = sequelize.define('Likes', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false,
  tableName: 'Megusta' // Nombre de la tabla en la base de datos
});

// Relación: Un comentario tiene un único usuario asignado
Likes.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Relación: Un comentario tiene una única receta asignada
Likes.belongsTo(Receta, { foreignKey: "id_receta" });

// Relación: Un usuario tiene muchos comentarios
Usuario.hasMany(Likes, { foreignKey: "id_usuario" });

// Relación: Una receta tiene muchos comentarios
Receta.hasMany(Likes, { foreignKey: "id_receta" });

export default Likes;