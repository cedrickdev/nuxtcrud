import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
    try {
        // Fetch all posts from the database
        const posts = await prisma.post.findMany()

        // Return the posts as the response
        return {
            statusCode: 200,
            Posts: posts, // Returning posts in the response body
        }
    } catch (error) {
        // Handle the error for database issues
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {statusCode: 400, Error, message: 'Error fetching posts', error: error.message};
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
