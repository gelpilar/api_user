import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Receta from './recipes.js';


const Lista = sequelize.define('Lista',{
    Id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Nombre:
    {
        type: DataTypes.STRING,
        unique:true
    },
    Cantidad:
    {
        type: DataTypes.INTEGER
    },
    Unidad:
    {
        type:DataTypes.STRING
    }
},{
    timestamps: false,
    tableName: 'Lista' // Nombre de la tabla en la base de datos
  })

  Receta.hasMany(Lista,{foreignKey: "id_receta"});
  Lista.belongsTo(Receta, {foreignKey: "id_receta"})
export default Lista;