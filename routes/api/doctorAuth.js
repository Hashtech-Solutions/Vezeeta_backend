import express from 'express';
import { DoctorCrud } from '../../models/doctorCrud.js';
import { UserCrud } from '../../models/userCrud.js';
import jwt from 'jsonwebtoken';

const server = express.Router();
const SECRET = process.env.JWT_SECRET;

server.post('/register', async (req, res, next) => {
    try {
        const doctor = await DoctorCrud.create(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserCrud.readOne(email);
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Flatten the user object
        if (user.role === 'DOCTOR') {
            let doctor = await DoctorCrud.readOneMail(email);
            doctor = { ...doctor, ...doctor.user };
            delete doctor.user;
            delete doctor.password;
            const token = jwt.sign(
                {
                    userId: doctor.id,
                    email: doctor.email,
                },
                SECRET,
                { expiresIn: '1d' }
            );
            res.set('Authorization', token);
            res.status(200).json(doctor);
        }
        else
        {
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
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.get('/all', async (req, res, next) => {
    try {
        const doctors = await DoctorCrud.readAll();
        res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.get('/one/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const doctor = await DoctorCrud.readOne(id);
        res.status(200).json(doctor);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

// get doctor by specialization
server.get('/specialization/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const doctor = await DoctorCrud.readBySpecialization(id);
        res.status(200).json(doctor);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default server;