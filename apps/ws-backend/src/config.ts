import dotenv from 'dotenv';

dotenv.config({path: ''});

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const WS_PORT = Number(process.env.WS_PORT) || 3005;