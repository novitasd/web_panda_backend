import { Router } from "express";
import {
    getProducts,
    getProduct,
    getProductById,
    storeProduct,
    editProduct,
    destroyProduct,
} from "./product.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

const router = Router();

// Públicas
router.get("/", getProducts);
router.get(
    "/id/:id",
    getProductById
);
router.get("/:slug", getProduct);

// Protegidas
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    storeProduct
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editProduct
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    destroyProduct
);

export default router;