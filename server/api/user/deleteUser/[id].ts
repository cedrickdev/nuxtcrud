import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {

    // Get the userId from the route parameters
    const { id } = event.context.params || {};

    const userId = parseInt(id);
    // Get the body from the request
    const body = await readBody(event);

    // Ensure userId is a valid number
    if (isNaN(userId)) {
        return { statusCode: 400, message: 'Invalid user ID' }
    }

    try {
        // Update the user by the provided userId
        const updatedUser = await prisma.user.delete({
            where: {
                id: userId, // Use the correct variable `userId`
            },
        });

        // Return the updated user
        return { statusCode: 200, user: updatedUser }

    } catch (error) {
        // Handle the case where user is not found
        if (error instanceof Error) {
            return { statusCode: 500, message: 'Error deleting user', error: error.message }
        }
        if (error instanceof Error) {
            return { statusCode: 404, message: 'User not found', error: error.message }
        }
    }
})
