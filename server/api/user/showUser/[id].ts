import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
    // Get the userId from the route parameters
    const { id } = event.context.params || {};  // Destructure and provide default if undefined

    // Validate if the id is a valid number
    if (!id || isNaN(parseInt(id))) {
        return { statusCode: 400, message: 'Invalid user ID' };
    }

    const userId = parseInt(id);  // Now userId is guaranteed to be a number

    try {
        // Try to find the user by the provided userId
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { posts: true },  // Include posts related to the user
        });

        // If no user is found
        if (!user) {
            return { statusCode: 404, message: 'User not found' };
        }

        // Return the user object with status 200
        return { statusCode: 200, user: user};

    } catch (error: unknown) {

        if (error instanceof Error) {

            return {
                statusCode: 500,
                message: 'Internal Server Error',
                error: error.message,
            };
        } else {

            return {
                statusCode: 500,
                message: 'Unknown error occurred',
                error: 'An unknown error occurred',
            };
        }
    }
});
