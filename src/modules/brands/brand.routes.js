import { Router } from "express";

import {
    getBrands,
    storeBrand,
    updateBrandController,
    deleteBrandController,
} from "./brand.controller.js";

const router = Router();

// Obtener marcas
router.get("/", getBrands);

// Crear marca
router.post("/", storeBrand);

// Editar marca
router.put("/:id", updateBrandController);

// Eliminar marca
router.delete("/:id", deleteBrandController);

export default router;