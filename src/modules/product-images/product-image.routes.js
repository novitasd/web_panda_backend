import { Router } from "express";
import productImageController from "./product-image.controller.js";
import upload from "../../middleware/upload.middleware.js";

const router = Router();

router.post(
    "/",
    upload.single("image"),
    productImageController.upload
);

router.get(
    "/:productId",
    productImageController.getByProduct
);

router.patch(
    "/:id/primary",
    productImageController.setPrimary
);

router.delete(
    "/:id",
    productImageController.delete
);

export default router;