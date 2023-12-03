import db from '../db.js'

export class UserCrud {
    static async create(body) {
        try {
            const { firstName, lastName, phoneNumber, nationalId, dateOfBirth, email, password } = body;
            return  await db.Patient.create({
                data: {
                    user: {
                        create: {
                            firstName,
                            lastName,
                            phoneNumber,
                            nationalId,
                            dateOfBirth: new Date(dateOfBirth),
                            email,
                            password,
                        }
                    }
                },
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async readAll() {
        try {
            const users = await db.user.findMany();
            // console.log(users);
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    static async readOne(email) {
        return await db.user.findUnique({
            where: {
                email
            },
        });
    }

    static async update(id, body) {
        return await db.user.update({
            where: {
                id: Number(id),
            },
            data: {
                ...body,
            },
        });
    }

    static async delete(id) {
        return await db.user.delete({
            where: {
                id: Number(id),
            },
        });
    }
}