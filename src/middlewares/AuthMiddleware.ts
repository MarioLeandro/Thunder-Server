import {verify} from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if(!accessToken) return res.status(401).json({error: "Usuário não autorizado"})

    const [, token] = accessToken.split(" ");

    try {
        const validToken = verify(token, process.env.SECRET);

        if(validToken) {
            req.user = validToken.user;
            return next();
        }
    } catch (error) {
        return res.status(401).json({error})
    }
}

export {validateToken};