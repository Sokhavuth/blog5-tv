import { PrismaClient } from "@prisma/client"
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import prismaRandom from 'prisma-extension-random'

const libsql = createClient({
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  url: `${process.env.TURSO_DATABASE_URL}`,
  //url: `file:./src/lib/db/dev.db`,
  //syncUrl: `${process.env.TURSO_DATABASE_URL}`,
})
//await libsql.sync()

const adapter = new PrismaLibSQL(libsql)
let prisma

if (process.env.NODE_ENV === "production") {
  prisma  = new PrismaClient({ adapter }).$extends(prismaRandom())
} else {
  if (!global.prisma) {
    global.prisma  = new PrismaClient({ adapter }).$extends(prismaRandom())
  }

  prisma = global.prisma
}

export default prisma