import db from '../db.js'
// import * from '../service/bookService.js'

export class bookingModel {
    static async create(body) {
        try {
            const { patientId, doctorId, ...rest } = body;
            // connect or create the specializations if not exists to the created doctor while creating the doctor
            return await db.Appointment.create({
                data: {
                    patient: {
                        connect: {
                            id: patientId
                        }
                    },
                    doctor: {
                        connect: {
                            id: doctorId
                        }
                    },
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
    static async readByDoctor(id, state) {
        try {
            let data =  await db.Appointment.findMany({
                where: {
                    doctorId: Number(id),
                    // day: {
                    //     gte: new Date().toISOString(),
                    //     lte: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString()
                    // }
                },
                orderBy: {
                    day: 'asc', // Order appointments by day in ascending order
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
            if (state === 'all') {
                return data;
            }
            // console.log(data);
            if (data.length === 0) {
                return [];
            }

            let result = [];
            result.push({
                workingHoursStart: data[0].doctor.workingHoursStart,
                workingHoursEnd: data[0].doctor.workingHoursEnd,
                bookingDuration: data[0].doctor.bookingDuration
            });
            
            // Group reservations by date
            const reservationsByDate = {};
            data.forEach(element => {
                let date = element.day.toISOString().split('T')[0];
                let time = element.startTime.toISOString().split('T')[1].split('.')[0];
                let endTime = element.endTime.toISOString().split('T')[1].split('.')[0];
                let reservation = {
                    id: element.id,
                    startTime: time.split(':')[0] + ':' + time.split(':')[1],
                    endTime: endTime.split(':')[0] + ':' + time.split(':')[1],
                    isReserved: true
                };
            
                if (!reservationsByDate[date]) {
                    reservationsByDate[date] = [];
                }
            
                reservationsByDate[date].push(reservation);
            });
            
            // Convert grouped reservations to the desired format
            Object.entries(reservationsByDate).forEach(([date, reservations]) => {
                let obj = {
                    [date]: reservations
                };
                result.push(obj);
            });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // get all appointments for a specific patient
    static async readByPatient(id) {
        try {
            let data = await db.Appointment.findMany({
                where: {
                    patientId: Number(id)
                },
                include: {
                    doctor:
                    {
                        include: {
                            user: true // Include user data for the doctor
                        }
                    }
                }
            });
            // console.log(data);
            return data;

            let result = [];
            // Group reservations by date
            const reservationsByDate = {};
            data.forEach(element => {
                let date = element.day.toISOString().split('T')[0];
                let time = element.startTime.toISOString().split('T')[1].split('.')[0];
                let endTime = element.endTime.toISOString().split('T')[1].split('.')[0];
                let reservation = {
                    id: element.id,
                    startTime: time.split(':')[0] + ':' + time.split(':')[1],
                    endTime: endTime.split(':')[0] + ':' + time.split(':')[1],
                    isReserved: true
                };
            
                if (!reservationsByDate[date]) {
                    reservationsByDate[date] = [];
                }
            
                reservationsByDate[date].push(reservation);
            });
            Object.entries(reservationsByDate).forEach(([date, reservations]) => {
                let obj = {
                    [date]: reservations
                };
                result.push(obj);
            });
            return result;
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