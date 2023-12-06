// import db from "../db.js";

// export class clinicModel {
//     static async create(body) {
//         try {
//             const { doctorId, ...rest } = body;
//             // create the clinic and connect it to the doctor
//             return await db.Clinic.create({
//                 data: {
//                     ...rest,
//                     doctors: {
//                         connect: {
//                             id: Number(doctorId),
//                         },
//                     },
//                 },
//             });
//         } catch (error) {
//             console.log(error);
//             return error;
//         }
//     }
    
//     static async readAll() {
//         try {
//         // return the doctor with the user and execlude the password from the user object
//             return await db.Clinic.findMany({
//                 include: {
//                 doctors: true,
//                 },
//             });
//         } catch (error) {
//             console.log(error);
//             return error;
//         }
//     }

//     // get docotr clinic
//     static async readByDoctor(id) {
//         try {
//         return await db.Clinic.findMany({
//             where: {
//             doctors: {
//                 some: {
//                 id: Number(id),
//                 },
//             },
//             },
//             include: {
//             doctors: true,
//             },
//         });
//         } catch (error) {
//         console.log(error);
//         }
//     }
    
//     // get all appointments for a specific doctor
//     static async readOne(id) {
//         try {
//         return await db.Clinic.findUnique({
//             where: {
//             id: Number(id),
//             },
//             include: {
//             doctors: true,
//             },
//         });
//         } catch (error) {
//         console.log(error);
//         }
//     }
    
//     static async update(id, body) {
//         try {
//         const { name, address, ...rest } = body;
//         return await db.Clinic.update({
//             where: {
//             id: Number(id),
//             },
//             data: {
//             name,
//             address,
//             ...rest,
//             },
//         });
//         } catch (error) {
//         console.log(error);
//         }
//     }
    
//     static async delete(id) {
//         try {
//         return await db.Clinic.delete({
//             where: {
//             id: Number(id),
//             },
//         });
//         } catch (error) {
//         console.log(error);
//         }
//     }
// }

// export default clinicModel;

// clinicModel.create({
//     address: "1234 Main St",
//     doctors: {
//         connect: {
//             id: 1,
//         },
//     },
// });

