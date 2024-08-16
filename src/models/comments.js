import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Receta from './list.js';
import Usuario from './user.js';


const Comentario = sequelize.define('Comentario', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Comentario' // Nombre de la tabla en la base de datos
});

// Relación: Un comentario tiene un único usuario asignado
Comentario.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Relación: Un comentario tiene una única receta asignada
Comentario.belongsTo(Receta, { foreignKey: "id_receta" });

// Relación: Un usuario tiene muchos comentarios
Usuario.hasMany(Comentario, { foreignKey: "id_usuario" });

// Relación: Una receta tiene muchos comentarios
Receta.hasMany(Comentario, { foreignKey: "id_receta" });

export default Comentario;
