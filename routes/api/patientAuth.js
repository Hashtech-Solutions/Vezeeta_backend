import express from 'express';
import { UserCrud } from '../../models/userCrud.js';


const server = express.Router();

server.post('/register', async (req, res, next) => {
    try {
        const user = await UserCrud.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserCrud.update(id, req.body);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserCrud.delete(id);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default server;