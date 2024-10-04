import { PrismaClient } from "@prisma/client"
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import prismaRandom from 'prisma-extension-random'

let prisma

if (process.env.NODE_ENV === "production") {
  const libsql = createClient({
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
    url: `${process.env.TURSO_DATABASE_URL}`,
    //url: `file:./db/dev.db`,
    //syncUrl: `${process.env.TURSO_DATABASE_URL}`,
  })
  const adapter = new PrismaLibSQL(libsql)

  prisma  = new PrismaClient({ adapter }).$extends(prismaRandom())
} else {
  const libsql = createClient({
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
    url: `${process.env.TURSO_DATABASE_URL}`,
    //url: `file:./static/db/dev.db`,
    //syncUrl: `${process.env.TURSO_DATABASE_URL}`,
  })
  const adapter = new PrismaLibSQL(libsql)

  if (!global.prisma) {
    global.prisma  = new PrismaClient({ adapter }).$extends(prismaRandom())
  }

  prisma = global.prisma
}

export default prisma