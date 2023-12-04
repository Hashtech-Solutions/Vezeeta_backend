import db from '../db.js'

export class bookingModel {
    static async create(body) {
        try {
            const { patient, doctor, date, ...rest } = body;
            // connect or create the specializations if not exists to the created doctor while creating the doctor
            return await db.Appointment.create({
                data: {
                    patient: {
                        connect: {
                            id: patient.id
                        }
                    },
                    doctor: {
                        connect: {
                            id: doctor.id
                        }
                    },
                    day: new Date(date),
                    ...rest

                },
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async readAll() {
        try {
            // return the doctor with the user and execlude the password from the user object
            return await db.Appointment.findMany({
                include: {
                    patient: true,
                    doctor: true
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // get all appointments for a specific doctor
    static async readByDoctor(id) {
        try {
            return await db.Appointment.findMany({
                where: {
                    doctorId: Number(id)
                },
                include: {
                    patient: {
                        include: {
                            user: true // Include user data for the patient
                        }
                    },
                    doctor: true,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // get all appointments for a specific patient
    static async readByPatient(id) {
        try {
            return await db.Appointment.findMany({
                where: {
                    patientId: Number(id)
                },
                include: {
                    patient: {
                        include: {
                            user: true // Include user data for the patient
                        }
                    },
                    doctor: true,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async readOne(id) {
        try {
            return await db.Appointment.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    patient: true,
                    doctor: true
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async update(id, body) {
        return await db.Appointment.update({
            where: {
                id: Number(id),
            },
            data: {
                ...body,
            },
        });
    }

    static async delete(id) {
        return await db.Appointment.delete({
            where: {
                id: Number(id),
            },
        });
    }
}

// await bookingModel.create({
//     patient: {
//         id: 1
//     },
//     doctor: {
//         id: 1
//     },
//     day: new Date('2021-09-01T09:00Z'),
//     startTime: new Date('2021-09-01T09:00Z'),
//     endTime: new Date('2021-09-01T09:00Z'),
// }).then(console.log).catch(console.log)

// await bookingModel.delete(1).then(console.log).catch(console.log)
