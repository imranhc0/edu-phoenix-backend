import express from 'express'; // Import express for routing
import { AuthRoutes } from '../services/auth/auth.route.js';
import { UserRoutes } from '../services/user/user.route.js';
import { PostsRoutes } from '../services/posts/posts.route.js';
import { AiGenerate } from '../services/ai/ai.route.js';


const router = express.Router(); // Create a new express router

// Define an array of routes with their paths and corresponding routes
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/ai',
    route: AiGenerate,
  },
  //   {
  //     path: '/user',
  //     route: UserRoutes,
  //   },
  //   {
  //     path: '/comments',
  //     route: CommentsRoutes,
  //   },
  {
    path: '/posts',
    route: PostsRoutes,
  },
];
// Iterate over the defined routes and use them with their paths
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router; // Export the router for use in the application
