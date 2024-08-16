import jwt from "jsonwebtoken";

export function authorize(allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado. No tienes permisos suficientes.' });
    }
    next();
  };
}

export function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error al verificar el token:", err.message);
    res.status(401).json({ message: 'Token no válido.' });
  }
}