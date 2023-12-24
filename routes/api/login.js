import { DoctorCrud } from '../../models/doctorCrud.js';
import { UserCrud } from '../../models/userCrud.js';
import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const server = express.Router();
const SECRET = process.env.JWT_SECRET;

server.post('/', async (req, res, next) => {
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
            res.set('Authorization', token)
            const patient = await UserCrud.readByPatient(user.id);
            res.status(200).json({
                id: patient[0].id,
                firstName: patient[0].user.firstName,
                lastName: patient[0].user.lastName,
                phoneNumber: patient[0].user.phoneNumber,
                nationalId: patient[0].user.nationalId,
                dateOfBirth: patient[0].user.dateOfBirth.toISOString().split('T')[0],
                role: patient[0].user.role,
                email: patient[0].user.email,
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default server;