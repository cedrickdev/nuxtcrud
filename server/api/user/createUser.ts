// server/api/createUser.js
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

 export default defineEventHandler(async (event) => {
  // Get the body from the request
  const body = await readBody(event);


  // Create a new user in the database
  try {
    const newUser = await prisma.user.create({
      data: {
        name : body.name,
        email : body.email,
      },
    })

    return { statusCode: 200, user: newUser }
  } catch (error) {
    // Type assertion to ensure `error` is of type `Error`
    if (error instanceof Error) {
      return { statusCode: 500, message: 'Error creating user', error: error.message }
    }
    return { statusCode: 500, message: 'Unknown error occurred' }
  }
 })
