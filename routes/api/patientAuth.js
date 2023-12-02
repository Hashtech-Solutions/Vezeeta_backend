import express from 'express';
import {UserCrud} from '../../models/userCrud.js';
import jwt from 'jsonwebtoken';

const server = express.Router();
const SECRET = process.env.JWT_SECRET;

server.post('/register', async (req, res, next) => {
    try {
        const user = await UserCrud.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserCrud.readOne(email);
        if (!user || user.password !== password || user.role !== 'PATIENT') {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            {
              userId: user.id,
              email: user.email,
            },
            SECRET,
            { expiresIn: '1d' }
        );
        res.status(200).json({ 
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                nationalId: user.nationalId,
                dateOfBirth: user.dateOfBirth.toISOString().split('T')[0],
                role: user.role,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default server;