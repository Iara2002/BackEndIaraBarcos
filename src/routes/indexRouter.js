import { Router } from "express";
import ticketRouter from "./ticketRouter.js";
import paymentRouter from "./paymentRouter.js";
import usersRouter from "./userRouter.js";
import viewsRouter from "./viewsRouter.js"
import productsRouter from "./productRouter.js";
import cartsRouter from "./cartRouter.js";
import sessionsRouter from "./sessionRouter.js";
import loggerRouter from "./loggerRouter.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve,setup } from "swagger-ui-express"
import swaggerOptions from "../config/swagger.js";

const router = Router();
const specs = swaggerJSDoc(swaggerOptions)

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/views", viewsRouter);
router.use("/sessions", sessionsRouter);
router.use("/tickets", ticketRouter);
router.use("/payments/intents", paymentRouter);
router.use("/sessions", sessionsRouter);
router.use("/loggers", loggerRouter)
router.use("/docs",serve,setup(specs))

export default router;