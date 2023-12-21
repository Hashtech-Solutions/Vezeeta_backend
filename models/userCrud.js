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
        const { firstName, lastName, phoneNumber, nationalId, dateOfBirth, email, password, ...rest } = body;
        const updatedPatient = await db.Patient.update({
            where: {
                id: Number(id),
            },
            data: {
                ...rest,
            },
        });
        const updatedUser = await db.User.update({
            where: {
                id: Number(updatedPatient.userId),
            },
            data: {
                firstName,
                lastName,
                phoneNumber,
                nationalId,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                email
            },
        });
        delete updatedUser.password;
        
        return { ...updatedUser, ...updatedPatient };
    }

    static async delete(id) {
        const d = await db.Patient.delete({
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