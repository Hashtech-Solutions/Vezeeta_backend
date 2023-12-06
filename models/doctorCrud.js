import db from '../db.js'

export class DoctorCrud {
    static async create(body) {
        try {
            // console.log(body);
            const { firstName, lastName, phoneNumber, nationalId, dateOfBirth, email, password, specializationId, image, ...rest } = body;
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
                    specialization: {
                        connect: {
                            id: parseInt(specializationId)
                            // id : specialization.id,
                            // name: specialization.name
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
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async readOne(id) {
        try {
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
                            password: false
                        }
                    }
                }
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async readOneMail(email) {
        try {
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
                            password: true
                        }
                    }
                }
            });
            return one[0];
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async readBySpecialization(id) {
        try {
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
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async update(id, body) {
        try {
            return await db.Doctor.update({
                where: {
                    id: Number(id),
                },
                data: {
                    ...body
                },
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async delete(id) {
        try {
            return await db.Doctor.delete({
                where: {
                    id: Number(id),
                },
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}