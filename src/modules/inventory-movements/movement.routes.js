import { Router } from "express";

import * as movementController from "./movement.controller.js";

import { validate } from "../../middleware/validate.js";

import { createMovementSchema } from "./movement.validation.js";

const router = Router();

router.get("/", movementController.findAll);

router.get("/:id", movementController.findById);

router.post(
    "/",
    validate(createMovementSchema),
    movementController.create
);

export default router;