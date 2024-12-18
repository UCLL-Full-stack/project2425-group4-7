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
                    profile: undefined,
                    plants: { create: [] },
            },
    });

    const user2 = await prisma.user.create({
        data: {
                    username: 'tony',
                    password: await bcrypt.hash('stark', 12),
                    email: 'tony.stark@ucll.be',
                    role: 'premium',
                    profile: undefined,
                    plants: { create: [] },
            },
    });

    const plant1 = await prisma.plant.create({
        data: {
                    name: 'Maggy Lefever',
                    type: 'Paphiopedilum',
                    family: 'Orchids',
                    wateringFreq: 'daily',
                    sunlight: 'Medium',
                    reminderEmail: true,
                    reminderSms: false,
                    userId: user1.id,
                    created: new Date(),
                    
        }
    })

    const plant2 = await prisma.plant.create({
        data: {
                    name: 'Little Alexander',
                    type: 'Paphiopedilum',
                    family: 'Orchids',
                    wateringFreq: 'weekly',
                    sunlight: 'Little',
                    reminderEmail: true,
                    reminderSms: false,
                    userId: user1.id,
                    created: new Date(),
                    
        }
    })
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