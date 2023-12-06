// import express from "express";
// import { clinicModel } from "../../models/clinicModel.js";

// const server = express.Router();

// server.post("/", async (req, res, next) => {
//     try {     
//         const booking = await clinicModel.set(body);
//         res.status(201).json(booking);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });

// server.get("/:id", async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const booking = await clinicModel.readOne(id);
//         res.status(200).json(booking);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });

// server.put("/:id", async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const body = req.body;
//         const booking = await clinicModel.update(id, body);
//         res.status(200).json(booking);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });

// server.delete("/:id", async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const booking = await clinicModel.delete(id);
//         res.status(200).json(booking);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// });