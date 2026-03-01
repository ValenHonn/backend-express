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
}
export default AuthService;