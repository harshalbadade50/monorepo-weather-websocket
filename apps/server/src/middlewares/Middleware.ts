import { Request, Response, NextFunction } from 'express';

class Middleware {

    public authenticate(req: Request, res: Response, next: NextFunction) {
        // 1. Here you'd check `Authorization` header
        // const token = req.headers.authorization?.split(' ')[1];

        // 2. Decode JWT or API key
        // req.user = decode(token);

        // 3. Check scope/role access
        // if (!req.user || !req.user.roles.includes('viewer')) {
        //   return res.status(403).json({ error: 'Forbidden' });
        // }

        next();
    }
}

export const middleware = new Middleware()