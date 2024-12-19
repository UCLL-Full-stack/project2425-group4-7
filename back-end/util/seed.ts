// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

const main = async () => {
    await prisma.plant.deleteMany();
    await prisma.profile.deleteMany();
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

    const profile1 = await prisma.profile.create({
        data: {
                    firstName: 'Peter',
                    lastName: 'Parker',
                    phoneNumber: '0478446728',
                    userId: user1.id
        }
    })

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

    const profile2 = await prisma.profile.create({
        data: {
                    firstName: 'Tony',
                    lastName: 'Stark',
                    phoneNumber: '0497685437',
                    userId: user2.id
        }
    })

    const admin = await prisma.user.create({
        data: {
                    username: 'admin',
                    password: await bcrypt.hash('admin123', 12),
                    email: 'admin.administrator@ucll.be',
                    role: 'admin',
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
                    sunlight: 'high',
                    reminderEmail: true,
                    reminderSms: false,
                    userId: user1.id,
                    
        }
    })

    const plant2 = await prisma.plant.create({
        data: {
                    name: 'Little Alexander',
                    type: 'Paphiopedilum',
                    family: 'Orchids',
                    wateringFreq: 'weekly',
                    sunlight: 'medium',
                    reminderEmail: true,
                    reminderSms: false,
                    userId: user1.id,
                    
        }
    })

    const plant3 = await prisma.plant.create({
        data: {
                    name: 'Adminius Plantus',
                    type: 'Administratores',
                    family: 'Lamiaceae',
                    wateringFreq: '2-days',
                    sunlight: 'low',
                    reminderEmail: true,
                    reminderSms: false,
                    userId: admin.id,
                    
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