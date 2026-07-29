import { Router } from "express";

import * as stockController from "./stock.controller.js";

const router = Router();

router.get("/", stockController.findAll);

router.get("/:productId", stockController.findByProduct);

export default router;