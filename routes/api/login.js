import { DoctorCrud } from "../../models/doctorCrud.js";
import { UserCrud } from "../../models/userCrud.js";
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express.Router();
const SECRET = process.env.JWT_SECRET;

server.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserCrud.readOne(email);
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Flatten the user object
    if (user.role === "DOCTOR") {
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
        { expiresIn: "1d" }
      );
      res.set("Authorization", token);
      res.status(200).json(doctor);
    } else {
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        SECRET,
        { expiresIn: "1d" }
      );
      res.set("Authorization", token);
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        nationalId: user.nationalId,
        dateOfBirth: user.dateOfBirth.toISOString().split("T")[0],
        role: user.role,
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export default server;
