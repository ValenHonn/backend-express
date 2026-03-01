import AuthService from "../services/authService.js";

const authService = new AuthService();

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const {token} = await authService.register(username, email, password);

  
    res.cookie('token', token) //metodo interno de express, guardamos el token en la cookie llamada token
    return res.status(201).json({
      message: "User created successfully"

    });
  } catch (error) {
    console.log("NAME:", error.name);
    console.log("MESSAGE:", error.message);
    console.log("PARENT:", error.parent);     
    console.log("ORIGINAL:", error.original); 
    console.log("ERRORS:", error.errors);     
     
    return res.status(500).json({ message: error.message }); //para que el servidor responda algo y no quede colgado con el cliente esperando una respuesta
    
  }
};

const login = (req, res) => res.send("login");

export default {register, login}