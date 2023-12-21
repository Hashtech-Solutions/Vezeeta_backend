import db from '../db.js'

function flattenDoctors(doctors) {
    return doctors.map((doctor) => ({
        ...doctor,
        ...doctor.user,
        user: undefined, // Exclude the nested user property
    }));
}

function flattenDoctor(doctor) {
    return {
        ...doctor,
        ...doctor.user,
        user: undefined, // Exclude the nested user property
    };
}

export class DoctorCrud {
    static async create(body) {
        
        // console.log(body);
        const { firstName, lastName, phoneNumber, nationalId, dateOfBirth, email, password, specializationId, image, fees, workingHoursStart, workingHoursEnd, bookingDuration, ...rest} = body;
        // connect or create the specializations if not exists to the created doctor while creating the doctor
        return await db.Doctor.create({
            data: {
                user: {
                    create: {
                        firstName,
                        lastName,
                        phoneNumber,
                        nationalId,
                        dateOfBirth: new Date(dateOfBirth),
                        email,
                        image,
                        password,
                        role: 'DOCTOR'
                    }
                },
                // specialization: {
                //     connect: {
                //         id: parseInt(specializationId)
                //         // id : specialization.id,
                //         // name: specialization.name
                //     }
                // },
                workingHoursStart: workingHoursStart ? parseInt(workingHoursStart) : '12:00',
                workingHoursEnd: workingHoursEnd ? parseInt(workingHoursEnd) : '23:00',
                bookingDuration: bookingDuration ? parseInt(bookingDuration) : 1,
                fees: parseInt(fees),
                ...rest

            },
        });        
    }

    static async readAll() {
        // return the doctor with the user and execlude the password from the user object
        const doctors = await db.Doctor.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                        nationalId: true,
                        dateOfBirth: true,
                        email: true,
                        role: true,
                        password: false,
                        image: true
                    }
                },
                specialization: true
            }
        });

        return flattenDoctors(doctors)
    }

    static async readOne(id) {
        // get the user and doctor information and execlude password from the user object
        const doctors = await db.Doctor.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                        nationalId: true,
                        dateOfBirth: true,
                        email: true,
                        role: true,
                        password: false,
                        image: true
                    }
                }
            }
        });

        return flattenDoctor(doctors)
    }

    static async readOneMail(email) {
        // search user via emai and include the doctor information
        let one =  await db.Doctor.findMany({
            where: {
                user: {
                    email
                },
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                        nationalId: true,
                        dateOfBirth: true,
                        email: true,
                        role: true,
                        password: true,
                        image: true
                    }
                }
            }
        });
        return one[0];
    }

    static async readBySpecialization(id) {
        // get the user and doctor information and execlude password from the user object
        return await db.Doctor.findMany({
            where: {
                specializationId: Number(id),
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                        nationalId: true,
                        dateOfBirth: true,
                        email: true,
                        role: true,
                        password: false
                    }
                }
            }
        });
    }

    static async update(id, body) {
        const { firstName, lastName, phoneNumber, nationalId, dateOfBirth, email, password, ...rest } = body;
        console.log(body);
        const updatedDoctor = await db.Doctor.update({
            where: {
                id: Number(id),
            },
            data: {
                ...rest
            },
        });
        // console.log(updatedDoctor);

        const updatedUser = await db.User.update({
            where: {
                id: Number(updatedDoctor.userId)
            },
            data: {
                firstName,
                lastName,
                phoneNumber,
                nationalId,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                email,
                password
            }
        });
        console.log(updatedUser);
        return { ...updatedUser, ...updatedDoctor };
    }

    static async delete(id) {
        const d = await db.Doctor.delete({
            where: {
                id: Number(id),
            },
        });
        return await db.User.delete({
            where: {
                id: Number(d.userId),
            },
        });
    }
}