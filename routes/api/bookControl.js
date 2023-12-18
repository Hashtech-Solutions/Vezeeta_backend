import express from "express";
import { bookingModel } from "../../models/bookModel.js";
import { DoctorCrud } from "../../models/doctorCrud.js";
import { isOverlapping, getWeekCalender }  from "../../services/bookService.js";

const server = express.Router();

// Create a new booking
server.post("/", async (req, res, next) => {
    try {
        const { day, start, end, doctorId, ...rest } = req.body;

        // validate the body
        const reserved = await bookingModel.readByDoctor(doctorId, 'some');
        console.log('here')
        console.log(reserved);
        if (reserved.length != 0) {
            let ans = isOverlapping(reserved, {
                day: day,
                startTime: start,
                endTime: end,
                bookingDuration: reserved[0].bookingDuration,
            })
            if (ans) {
                return res.status(400).json({ message: "Overlapping or outside working hours" });
            }
        }

        let body = {
            day: new Date(day),
            startTime: new Date(`${day}T${start}Z`),
            endTime: new Date(`${day}T${end}Z`),
            doctorId: Number(doctorId),
            ...rest
        }

        const booking = await bookingModel.create(body);
        res.status(201).json(booking);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.get("/availble_slots/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const booking = await bookingModel.readByDoctor(id, 'one');
        const doctorTimes = await DoctorCrud.readOne(id);
        console.log('xx1', doctorTimes)
        console.log('xx2', booking)
        let time = {
            workingHoursStart: parseInt(doctorTimes.workingHoursStart) * 60,
            workingHoursEnd: parseInt(doctorTimes.workingHoursEnd) * 60,
            timeSlotDuration: parseInt(doctorTimes.bookingDuration) * 60
        }
        // console.log(time);
        const slots = getWeekCalender(booking, time);
        res.status(200).json(slots);        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
})

// Get all bookings
server.get("/all", async (req, res, next) => {
    try {
        const bookings = await bookingModel.readAll();
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});


// Get one booking
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

// Get all bookings by patient
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

// Get all bookings for doctor
server.get("/doctor/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = await bookingModel.readByDoctor(id, 'all');
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

server.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = await bookingModel.delete(id);
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

export default server;