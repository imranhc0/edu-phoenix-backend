import express from 'express'; // Import express for routing

const router = express.Router(); // Create a new express router

// Define an array of routes with their paths and corresponding routes
const moduleRoutes = [];
// Iterate over the defined routes and use them with their paths
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router; // Export the router for use in the application
