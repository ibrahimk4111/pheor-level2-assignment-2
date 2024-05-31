import {Router} from 'express';
import { orderRouters } from '../modules/orders/order.routes';
import { productRouters } from '../modules/products/product.routes';
import { stripePaymentRouter } from '../middlewares/stripe';

const router = Router();

router.use("/api/products", productRouters)
router.use("/api/orders", orderRouters)
router.use("/api/", stripePaymentRouter)

export const allRouters = router