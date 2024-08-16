import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';


const Usuario = sequelize.define('Usuario',{
    Id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Name:
    {
        type: DataTypes.STRING,
        unique:true
    },
    Email:
    {
        type: DataTypes.STRING,
        unique:true
    },
    Pass:
    {
        type: DataTypes.STRING
    },
    tipoUsuario:
    {
        type: DataTypes.ENUM("administrador","usuario","lector")
    }
},{
    timestamps: false,
    tableName: 'Usuario' // Nombre de la tabla en la base de datos
  })

  export default Usuario;