import { Router } from "express";

import { sitemap } from "./sitemap.controller.js";


const router = Router();


router.get(
  "/",
  sitemap
);


export default router;