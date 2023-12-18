import db from '../db.js'

export class DoctorCrud {
    static async create(body) {
        
        // console.log(body);
        const { firstName, lastName, phoneNumber, nationalId, dateOfBirth, email, password, specializationId, image, fees, ...rest } = body;
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
                fees: parseInt(fees),
                ...rest

            },
        });        
    }

    static async readAll() {
        // return the doctor with the user and execlude the password from the user object
        return await db.Doctor.findMany({
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
    }

    static async readOne(id) {
        // get the user and doctor information and execlude password from the user object
        return await db.Doctor.findUnique({
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
        return await db.Doctor.update({
            where: {
                id: Number(id),
            },
            data: {
                ...body
            },
        });
    }

    static async delete(id) {
        return await db.Doctor.delete({
            where: {
                id: Number(id),
            },
        });
    }
}