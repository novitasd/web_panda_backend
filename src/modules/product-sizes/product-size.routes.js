import { Router } from "express";

import * as productSizeController from "./product-size.controller.js";

import { validate } from "../../middleware/validate.js";

import {
    createProductSizeSchema
} from "./product-size.validation.js";

const router = Router();

router.post(
    "/",
    validate(createProductSizeSchema),
    productSizeController.create
);

export default router;