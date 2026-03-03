import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";

class AuthService {

  async register(username, email, password) {
    try {

      //encriptar contraseña
      const passwordHash = await bcrypt.hash(password, 10);  

      // crear usuario
      const newUser = await User.create({ //llamo al metodo del modelo User de sequelize
        username,
        email,
        password: passwordHash
      });

      const token = await createAccessToken({id: newUser.id})

      return {token};

    } catch (error) {
        throw error;
     
    }
  }

  async login(email, password) {
    try {

      const userFound = await User.findOne({
        where: {
          email: email //se podria dejar solo email, pero es para que se entienda que se busca el usuario que en la columna email tenga el valor de la variable email
        }
      }); 

      if (!userFound) 
        throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, userFound.password);  //comparamos la contraseña que nos pasa el usuario con la contraseña del usuario que encontramos en la base de datos
      //esto es posible ya que podemos acceder a los valores de los campos del usuario
      //compare devuelve true o false

      if (!isMatch) 
        throw new Error("Incorrect password");

      const token = await createAccessToken({id: userFound.id}) //creamos el token para que no se tenga que loguear otra vez

      return {token}; //le retornamos el token al controlador

    } catch (error) { //atrapa errores tecnicos, los de negocio los manejamos arriba
        throw error;
     
    }
  }
   
  async profile(userId) {
    try {
      const userFound = await User.findByPk(userId);

      if (!userFound) {
        throw new Error("User not found");
      }

      return userFound;

    } catch (error) {
      throw error;
    }
  }
}
export default AuthService;