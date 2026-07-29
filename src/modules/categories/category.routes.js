import { Router } from "express";

import {
    getCategories,
    storeCategory,
    updateCategoryController,
    deleteCategoryController,
} from "./category.controller.js";

const router = Router();

router.get("/", getCategories);

router.post("/", storeCategory);

router.put(
    "/:id",
    updateCategoryController
);

router.delete(
    "/:id",
    deleteCategoryController
);

export default router;