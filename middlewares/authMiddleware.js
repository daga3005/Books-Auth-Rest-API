import jwt from 'jsonwebtoken';


export const authenticateToken = (req, res, next) => {
    // Obtener token de la cookie (como lo envías en login)
    const token = req.cookies.AccessToken;
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Acceso denegado. No estás autenticado' 
        });
    }
    
    try {
       
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        
        req.user = {
            email: verified.email,
           
        };
        
        next(); 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ 
                success: false, 
                message: 'Token expirado. Por favor, inicia sesión nuevamente' 
            });
        }
        
        return res.status(403).json({ 
            success: false, 
            message: 'Token inválido' 
        });
    }
};

