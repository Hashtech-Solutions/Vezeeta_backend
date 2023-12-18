import db from '../db.js'

export class UserCrud {
    static async create(body) {
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
    }

    static async readAll() {
       
        const users = await db.user.findMany();
        // console.log(users);
        return users;
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
        return await db.Patient.delete({
            where: {
                id: Number(id),
            },
        });
    }
}