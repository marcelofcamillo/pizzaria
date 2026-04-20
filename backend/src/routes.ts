import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { validateSchema } from './middlewares/validateSchema';
import { authUserSchema, createUserSchema } from './schemas/UserSchema';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { isAdmin } from './middlewares/isAdmin';
import { createCategorySchema } from './schemas/categorySchema';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductController } from './controllers/product/ListProductController';
import {
  createProductSchema,
  listProductSchema,
} from './schemas/productSchema';
import { DeleteProductController } from './controllers/product/DeleteProductController';

const router = Router();
const upload = multer(uploadConfig);

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
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// Rotas products
router.post(
  '/product',
  isAuthenticated,
  isAdmin,
  upload.single('file'),
  validateSchema(createProductSchema),
  new CreateProductController().handle,
);
router.get(
  '/products',
  isAuthenticated,
  validateSchema(listProductSchema),
  new ListProductController().handle,
);
router.delete(
  '/product',
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle,
);

export { router };
