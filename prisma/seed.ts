import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as bcrypt from 'bcrypt'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const passwordHash = await bcrypt.hash('admin123', 10)

    await prisma.adminUser.upsert({
        where: { email: 'admin@techrv.com' },
        update: {},
        create: {
            email: 'admin@techrv.com',
            passwordHash,
        },
    })

    console.log('✅ Admin user created: admin@techrv.com / admin123')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())