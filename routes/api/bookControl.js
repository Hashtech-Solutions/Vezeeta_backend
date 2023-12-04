import e from "express";
import { bookingModel } from "../../models/bookModel.js";
import express from "express";

const server = express.Router();

server.post("/", async (req, res, next) => {
    try {
        const booking = await bookingModel.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
    });

server.get("/all", async (req, res, next) => {
    try {
        const bookings = await bookingModel.readAll();
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});


server.get("/one/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = await bookingModel.readOne(id);
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.get("/patient/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = await bookingModel.readByPatient(id);
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.get("/doctor/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = await bookingModel.readByDoctor(id);
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default server;