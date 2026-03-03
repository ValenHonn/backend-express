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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const {token} = await authService.login(email, password);
  
    res.cookie('token', token)

    return res.status(200).json({
      message: "User authenticated successfully"
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

const logout = (req, res) => {
  res.cookie("token","", { //sobreescribimos la cookie de manera que se venza.
    expires: new Date(0)})

  return res.sendStatus(200);
}

const profile = async (req, res) => {
  try{
    const user = await authService.profile(req.user.id);

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }
  catch (error){
    console.log("NAME:", error.name);
    console.log("MESSAGE:", error.message);
    console.log("PARENT:", error.parent);     
    console.log("ORIGINAL:", error.original); 
    console.log("ERRORS:", error.errors);
  }
}

export default {register, login, logout, profile}