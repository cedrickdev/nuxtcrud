
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
    
     // Get the userId from the route parameters
     const params = event.context.params; // Store params in a variable
     if (!params || typeof params.id !== 'string') { // Check if params is defined and id is a string
         return { statusCode: 400, message: 'Invalid user ID' };
     }
     
     const userId = parseInt(params.id); // Now safe to access params.id
 

    // Ensure userId is a valid number
    if (isNaN(userId)) {
        return { statusCode: 400, message: 'Invalid user ID' }
    }

    // Try to find the user by the provided userId
    const findUser = await prisma.user.findUnique({
        where: {
            id: userId, // Use the correct variable `userId` instead of `id`
        }
    })

    if (!findUser) {
        return { statusCode: 404, message: 'User not found' }
    }

    // Return the user if found
    return { statusCode: 200, user: findUser }
})
