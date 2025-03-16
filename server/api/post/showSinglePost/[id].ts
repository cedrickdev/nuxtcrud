import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {

    // Get the postId from the route parameters
    const params = event.context.params; // Store params in a variable
    if (!params || typeof params.id !== 'string') { // Check if params is defined and id is a string
        return {statusCode: 400, message: 'Invalid post ID'};
    }

    const postId = parseInt(params.id); // Now safe to access params.id


    // Ensure postId is a valid number
    if (isNaN(postId)) {
        return {statusCode: 400, message: 'Invalid post ID'}
    }
    try {
        // Try to find the post by the provided postId
        const findPost = await prisma.post.findUnique({
            where: {
                id: postId, // Use the correct variable `postId` instead of `id`
            }
        })

        if (!findPost) {
            return {statusCode: 404, message: 'post not found'}
        }
        // Return the post if found
        return {statusCode: 200, Post: findPost}

    } catch (error) {
        // Handle the error for database issues
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {statusCode: 400, Error, message: 'Error deleting post', error: error.message};
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
