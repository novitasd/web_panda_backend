import { Router } from "express";

import * as sizeController from "./size.controller.js";

import {
    createSizeSchema,
    updateSizeSchema
} from "./size.validation.js";

import { validate } from "../../middleware/validate.js";

const router = Router();

/**
 * Obtener todas las tallas
 */
router.get("/", sizeController.findAll);

/**
 * Obtener una talla por ID
 */
router.get("/:id", sizeController.findById);

/**
 * Crear talla
 */
router.post(
    "/",
    validate(createSizeSchema),
    sizeController.create
);

/**
 * Actualizar talla
 */
router.put(
    "/:id",
    validate(updateSizeSchema),
    sizeController.update
);

/**
 * Eliminar talla
 */
router.delete(
    "/:id",
    sizeController.remove
);

export default router;