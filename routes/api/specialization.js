import { specializationCrud } from '../../models/specializationModel.js';
import express from 'express';

const server = express.Router();

server.post('/specialization', async (req, res, next) => {
    try {
        const specialization = await specializationCrud.create(req.body);
        res.status(201).json(specialization);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.get('/specializations', async (req, res, next) => {
    try {
        const specializations = await specializationCrud.readAll();
        res.status(200).json(specializations);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.get('/specialization/:id', async (req, res, next) => {
    try {
        const specialization = await specializationCrud.readOne(req.params.id);
        res.status(200).json(specialization);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.put('/specialization/:id', async (req, res, next) => {
    try {
        const specialization = await specializationCrud.update(req.params.id, req.body);
        res.status(200).json(specialization);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.delete('/specialization/:id', async (req, res, next) => {
    try {
        const specialization = await specializationCrud.delete(req.params.id);
        res.status(200).json(specialization);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default server;