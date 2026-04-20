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
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController';
import {
  createProductSchema,
  listProductSchema,
  listProductByCategorySchema,
} from './schemas/productSchema';
import { DeleteProductController } from './controllers/product/DeleteProductController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveItemOrderController } from './controllers/order/RemoveItemOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import {
  addItemSchema,
  createOrderSchema,
  removeItemSchema,
  detailOrderSchema,
  sendOrderSchema,
} from './schemas/orderSchema';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { AddItemOrderController } from './controllers/order/AddItemOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';

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
router.get(
  '/category/product',
  isAuthenticated,
  validateSchema(listProductByCategorySchema),
  new ListProductByCategoryController().handle,
);

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

// Rotas orders
router.post(
  '/order',
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle,
);
router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get(
  '/order/detail',
  isAuthenticated,
  validateSchema(detailOrderSchema),
  new DetailOrderController().handle,
);
router.post(
  '/order/add',
  isAuthenticated,
  validateSchema(addItemSchema),
  new AddItemOrderController().handle,
);
router.delete(
  '/order/remove',
  isAuthenticated,
  validateSchema(removeItemSchema),
  new RemoveItemOrderController().handle,
);
router.put(
  '/order/send',
  isAuthenticated,
  validateSchema(sendOrderSchema),
  new SendOrderController().handle,
);

export { router };
