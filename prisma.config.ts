import { defineConfig } from 'prisma/config'
import 'dotenv/config'

const datasourceUrl = process.env.DIRECT_URL || process.env.DATABASE_URL

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: datasourceUrl!,
  },
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
})
