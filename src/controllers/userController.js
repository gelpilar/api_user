import { sequelize } from '../config/db.js';
import Usuario from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10; // Número de rondas para generar la sal


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};


export const postUser = async (req, res) => {
  const { Name, Email, Pass, tipoUsuario } = req.body;
  const hashedPassword = await hashPassword(Pass);
  try {
      // Realizar la consulta de inserción
      const [results, metadata] = await sequelize.query(
          "INSERT INTO Usuario (Email, Name, Pass, tipoUsuario) VALUES (?, ?, ?, ?)",
          {
              replacements: [Email, Name, hashedPassword, tipoUsuario],
              type: sequelize.QueryTypes.INSERT // Asegúrate de que el tipo de consulta sea INSERT
          }
      );

      // Verificar si se insertó algún registro
      if (metadata.affectedRows === 0) {
          return res.status(400).send('No se pudo crear el usuario');
      }

      // Responder con éxito si la inserción fue correcta
      res.status(201).send('Usuario creado exitosamente');
      
  } catch (err) {
      // Manejo de errores
      console.error('Error en la creación del usuario:', err.message);
      res.status(500).send('Error en el servidor');
  }
};



export const loginUser= async(req,res)=>{

  try{

    const {Email,Pass}= req.body;
    
  
    const [rows] = await sequelize.query("SELECT * FROM Usuario WHERE Email= ? ",
      {
          replacements: [Email]
      }
  );
  if(rows.length ===0)
  {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

  }
  const user = rows[0];

  const isMatch= await bcrypt.compare(Pass,user.Pass)

  if (!isMatch) {
    
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
}


const token = jwt.sign({
  id: user.Id,
  role: user.tipoUsuario
}, process.env.JWT_SECRET, { // Corregido de `JWR_SECRET` a `JWT_SECRET`
  expiresIn: '1h'
});

res.status(200).json({ token, message: 'Login exitoso' });
  }catch(err)
  {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};



export const getUsers = async (req,res)=>{

  try
  {
    const [rows] = await sequelize.query("SELECT Id, Name, Email,tipoUsuario FROM Usuario ");

    if(rows.length !== 0)
    {
      res.status(200).json( rows );
  
    }else{
      return res.status(401).json({ message: 'Error al traer usuarios' });
    }
  }catch(err)
  {
    res.status(500).json({ message: 'Error al traer usuarios', error: err.message });

  }
}

export const getUser = async (req,res)=>{

  try
  {
    const Id= req.params.id;
    const [rows] = await sequelize.query("SELECT Id, Name, Email,tipoUsuario FROM Usuario WHERE Id= ? ",{
      replacements: [Id]
    });

    if(rows.length !== 0)
    {
      res.status(200).json( rows[0] );
  
    }else{
      return res.status(401).json({ message: 'Error al traer usuarios' });
    }
  }catch(err)
  {
    res.status(500).json({ message: 'Error al traer usuarios', error: err.message });

  }


}

export const getForNamer = async (req, res)=>{
  try
  {
    const cadena= req.body.cadena;
    const searchString = `%${cadena}%`; // Añade los comodines directamente a la cadena

    const [rows] = await sequelize.query(
        "SELECT Id, Name, Email,tipoUsuario FROM Usuario WHERE Name LIKE ?;",
        {
            replacements: [searchString] // Pasa la cadena con los comodines
        }
    );

    if(rows.length !== 0)
    {
      res.status(200).json( rows[0] );
  
    }else{
      return res.status(401).json({ message: 'Error al traer usuarios' });
    }
  }catch(err)
  {
    res.status(500).json({ message: 'Error al traer usuarios', error: err.message });

  }

}

export const putUser= async(req,res)=>{
  const {id} = req.params;
  const {Name} = req.body;

  try {
    await sequelize.query("UPDATE Usuario SET Name = ? WHERE Id = ?;",{
      replacements: [Name, id]
    })
    return res.status(200).json({ message: 'Cambiado con exito' });

  } catch (err) {
    res.status(500).json({ message: 'Error al traer usuarios', error: err.message });
  }

}

export const deleteUser= async(req,res)=>{
  const {id} = req.params;


  try {
    await sequelize.query("DELETE FROM Usuario WHERE Id = ?;",{
      replacements: [parseInt(id,10)]
    })
    return res.status(200).json({ message: 'Cambiado con exito' });

  } catch (err) {
    res.status(500).json({ message: 'Error al traer usuarios', error: err.message });
  }

}


/**
 * Post x
 * Get x x 
 * Put x
 * Delete x
*/

/*
// Registro de un nuevo usuario
export const registerUser = async (req, res) => {
  const { Name, Email, Pass, tipoUsuario } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await Usuario.findOne({ where: { Email } });

    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear el nuevo usuario
    user = await Usuario.create({
      Name,
      Email,
      Pass,  // Guardar la contraseña sin hash
      tipoUsuario
    });

    res.status(201).json(user);  // Devolver el usuario creado
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener información del usuario
export const getUser = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del usuario desde los parámetros de la ruta

  try {
    const user = await Usuario.findByPk(id, {
      attributes: { exclude: ['Pass'] }  // Excluir la contraseña de la respuesta
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};*/
