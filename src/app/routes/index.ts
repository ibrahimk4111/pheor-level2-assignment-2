import {Router} from 'express';
import { orderRouters } from '../modules/orders/order.routes';
import { productRouters } from '../modules/products/product.routes';

const router = Router();

router.use("/api/products", productRouters)
router.use("/api/orders", orderRouters)

export const allRouters = router