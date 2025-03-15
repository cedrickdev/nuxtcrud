import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {

    // Get the userId from the route parameters
    const params = event.context.params; // Store params in a variable
    if (!params || typeof params.id !== 'string') { // Check if params is defined and id is a string
        return { statusCode: 400, message: 'Invalid user ID' };
    }

    const userId = parseInt(params.id); // Now safe to access params.id
    // Get the body from the request
    const body = await readBody(event);

    // Ensure userId is a valid number
    if (isNaN(userId)) {
        return { statusCode: 400, message: 'Invalid user ID' }
    }

    try {
        // Update the user by the provided userId
        const updatedUser = await prisma.user.update({
            where: {
                id: userId, // Use the correct variable `userId`
            },
            data: {
                name: body.name,    // Update name if provided in the request body
                email: body.email,  // Update email if provided in the request body
            }
        });

        // Return the updated user
        return { statusCode: 200, user: updatedUser }

    } catch (error) {
        // Handle the case where user is not found
        if (error instanceof Error) {
            return { statusCode: 500, message: 'Error updating user', error: error.message }
        }
        if (error instanceof Error) {
            return { statusCode: 404, message: 'User not found', error: error.message }
        }
    }
})
