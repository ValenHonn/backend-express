//este middleware existe para rutas protegidas
//una ruta protegida es aquella que solo puede ejecutarse si el usuario esta autenticado
//para ver si esta autenticado miramos la cookie que el navegador guardo.

//este middleware junto con la funcion profile sirve para:
// Si el usuario esta logueado y quiere entrar a su perfil a ver sus datos, el servidor va a tomar el token 
// existente de su logueo y verificará si es valido y no esta vencido, esto para evitar que cualquiera entre 
// al perfil de cualquier usuario, se protege la ruta usando un token firmado por el servidor que contiene 
// la identidad del usuario autenticado.

import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../config/config.js';

export const authRequired = (req, res, next) => { //next significa, en vez de retornar una respuesta al cliente, segui con la siguiente funcion (la del controlador), esto es si todo va bien, sino retorna error
    const { token } = req.cookies; //extraigo el token de las cookies del header, ya que el navegador me envia la cookie en la req, token es una cookie

    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" }); //si no hay un token se le niega la autorizacion

    //verifica que el token no este expirado y la firma coincida con el secreto
    jwt.verify(token, TOKEN_SECRET, (err, user) => { //si todo va bien, guarda el payload decodificado (info que se guarda dentro del token, el id en este caso, mas fecha que se creo el token y de expiracion) en user, y si no el error en err
        if (err) 
            return res.status(403).json({ message: "Invalid token" }); //si hay un token pero es invalido (token expirado, firma incorrecta, yoken modificado)

        req.user = user //al objeto req, le agrego una propiedad personalizada user, en esta guardo el payload decodificado 
  
        next(); //paso a la funcion del controlador
    }); 

  
}