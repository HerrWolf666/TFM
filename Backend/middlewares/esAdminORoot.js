const esAdminORoot = (req, res, next) => {
    if (req.usuario.rol === 'administrador' || req.usuario.rol === 'root') {
      next();
    } else {
      res.status(403).send({ message: 'No autorizado. Se requiere rol de administrador o root.' });
    }
  };
  
  const isDoctor = (req, res, next) => {
    if (req.usuario.rol === 'doctor') {
      next();
    } else {
      res.status(403).send({ message: 'No autorizado. Se requiere rol de doctor.' });
    }
  };
  