import express from 'express';


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

export default server;