// server/api/createUser.js
import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // Get the body from the request
    const body = await readBody(event);


    // Create a new post in the database
    try {
        const newPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                author: {
                    connect: {
                        id: body.authorId,
                    }
                }
            },
        })

        return {statusCode: 200, post: newPost}
    } catch (error) {
        // Handle the error for database issues
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {statusCode: 400, Error, message: 'Error Creating post', error: error.message};
        } else if (error instanceof Error) {
            // Handle general Typescript errors (e.g., unexpected errors)
            return {
                statusCode: 500,
                message: 'An unexpected error occurred',
                error: error.message,
            };
        } else {
            // If the error type is unknown
            return {statusCode: 500, message: 'Unknown error occurred', error: (error as Error).message};
        }

    }
})
