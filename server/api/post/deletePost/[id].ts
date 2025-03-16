import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
    // Get the postId from the route parameters
    const { id } = event.context.params || {};

    const postId = parseInt(id);
    // Ensure postId is a valid number
    if (isNaN(postId)) {
        return { statusCode: 400, message: 'Invalid post ID' };
    }

    try {
        // Check if the post exists first
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return { statusCode: 404, message: 'Post not found' };
        }

        // Delete the post if it exists
        const deletedPost = await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        // Return the deleted post (optional)
        return { statusCode: 200, message: "Post deleted successfully" };

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
});
