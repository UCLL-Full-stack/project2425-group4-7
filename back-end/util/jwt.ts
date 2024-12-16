import jwt from 'jsonwebtoken';
import { Role } from '../types';
import { NextFunction } from 'express';


const generateJwtToken = ({ username, role }: { username: string; role: Role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };

    try {
        return jwt.sign({ username, role }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

interface JwtPayload {
    username: string;
    role: Role;
}

export { generateJwtToken};
