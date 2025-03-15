import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default eventHandler (async (event) => {
     const users = await prisma.user.findMany();
        return users
})
