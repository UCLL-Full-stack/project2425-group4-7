// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

const main = async () => {
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
        data: {
                    username: 'peter',
                    password: await bcrypt.hash('spiderman', 12),
                    email: 'peter.parker@ucll.be',
                    role: 'user',
            },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();