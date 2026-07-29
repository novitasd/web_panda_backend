import { Router } from "express";

import * as orderController from "./order.controller.js";

import { validate } from "../../middleware/validate.js";

import { createOrderSchema } from "./order.validation.js";

const router = Router();

router.get("/", orderController.findAll);

router.get("/:id", orderController.findById);

router.post(
    "/",
    validate(createOrderSchema),
    orderController.create
);

export default router;