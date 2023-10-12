import { Gender, PrismaClient, Status, Student } from "@prisma/client";

const prisma = new PrismaClient();


// async function main() {
//     for (let i = 0; i < 100; i++) {
//         await prisma.department.create({
//             data: {
//                 name: `Department ${i}`,
//                 founding: new Date(),
//                 description: `Description ${i}`,
//                 id: `Department ${i}`,
//             },
//         })
//     }
//     console.log('ok');
// }
// main()
export default prisma;
