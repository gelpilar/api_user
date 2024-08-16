import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Usuario from './user.js';


const Receta = sequelize.define('Receta',{
    Id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Nombre:
    {
        type: DataTypes.STRING,
        unique:true
    }
},{
    timestamps: false,
    tableName: 'Receta' // Nombre de la tabla en la base de datos
  })

  Usuario.hasMany(Receta,{foreignKey: "Id_creador"});
  Receta.belongsTo(Usuario, {foreignKey: "Id_creador"})
export default Receta;