import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { validateSchema } from './middlewares/validateSchema';
import { authUserSchema, createUserSchema } from './schemas/UserSchema';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { isAdmin } from './middlewares/isAdmin';

const router = Router();

// Rotas users
router.post(
  '/users',
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);
router.post(
  '/session',
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// Rotas categories
router.post(
  '/category',
  isAuthenticated,
  isAdmin,
  new CreateCategoryController().handle,
);

export { router };
