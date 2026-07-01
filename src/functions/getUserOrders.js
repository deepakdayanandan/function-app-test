const { app } = require('@azure/functions');
const { User, Order, Product } = require('../models'); // Import from registry

app.http('getUserOrders', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'users/{userId}/orders',
    handler: async (request, context) => {
        const userId = request.params.userId;

        if (!userId) {
            return { status: 400, jsonBody: { success: false, message: 'User ID is required.' } };
        }

        try {
            // Eager loading 3 tables using pure Sequelize ORM methods
            const userWithOrders = await User.findByPk(userId, {
                include: [
                    {
                        model: Order,
                        required: true, // Forces an INNER JOIN instead of LEFT JOIN
                        include: [
                            {
                                model: Product,
                                required: true,
                                through: { attributes: [] } // Excludes bridge table (Order_Items) metadata columns
                            }
                        ]
                    }
                ],
                order: [[Order, 'order_date', 'DESC']] // Sorts orders by date descending
            });

            if (!userWithOrders) {
                return {
                    status: 404,
                    jsonBody: { success: false, message: 'User or orders not found.' }
                };
            }

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    data: userWithOrders
                }
            };

        } catch (error) {
            context.log.error('Sequelize ORM Query Error:', error);
            return {
                status: 500,
                jsonBody: { success: false, message: 'Internal server error processing database query.' }
            };
        }
    }
});