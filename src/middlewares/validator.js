export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); //valida el req.body comparandolo con el esquema
    next(); //si va todo bien pasa a la siguiente funcion
  } catch (error) {
    const issues = error.issues ?? error.errors ?? [];
    return res.status(400).json({
      error: issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }
};