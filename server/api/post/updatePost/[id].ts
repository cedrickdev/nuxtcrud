import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {

    // Get the postId from the route parameters
    const {id} = event.context.params || {};

    const postId = parseInt(id);
    // Get the body from the request
    const body = await readBody(event);

    // Ensure postId is a valid number
    if (isNaN(postId)) {
        return {statusCode: 400, message: 'Invalid post ID'}
    }

    try {
        // Update the post by the provided postId
        const updatedPost = await prisma.post.update({
            where: {
                id: postId, // Use the correct variable `postId`
            },
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                author: {
                    connect: {
                        id: body.authorId,
                    }
                }
            }
        });

        // Return the updated post
        return {statusCode: 200, post: updatedPost}

    } catch (error) {
        // Handle the error for database issues
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {statusCode: 400, Error, message: 'Error Updating post', error: error.message};
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
