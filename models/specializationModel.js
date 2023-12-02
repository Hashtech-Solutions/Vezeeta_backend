import db from '../db.js'

export class specializationCrud {
    static async create(body) {
        try {
            const { name } = body;
            return  await db.specialization.create({
                data: {
                    name,
                }
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async readAll() {
        try {
            const specializations = await db.specialization.findMany();
            // console.log(specializations);
            return specializations;
        } catch (error) {
            console.log(error);
        }
    }

    static async readOne(id) {
        return await db.specialization.findUnique({
            where: {
                id: Number(id),
            },
        });
    }

    static async update(id, body) {
        return await db.specialization.update({
            where: {
                id: Number(id),
            },
            data: {
                name: body.name,
            },
        });
    }

    static async delete(id) {
        return await db.specialization.delete({
            where: {
                id: Number(id),
            },
        });
    }
}