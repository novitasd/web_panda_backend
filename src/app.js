import express from "express";
import cors from "cors";

import productRoutes from "./modules/products/product.routes.js";
import brandRoutes from "./modules/brands/brand.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import stockRoutes from "./modules/stock/stock.routes.js";
import sizeRoutes from "./modules/sizes/size.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import movementRoutes from "./modules/inventory-movements/movement.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import productSizeRoutes from "./modules/product-sizes/product-size.routes.js";
import productImageRoutes from "./modules/product-images/product-image.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bienvenido a la API de TNIS"
    });
});

// Rutas de la API
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/movements", movementRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/product-sizes", productSizeRoutes);
app.use("/api/product-images", productImageRoutes);
app.use("/api/auth", authRoutes);

// Middleware de errores
app.use((err, req, res, next) => {
    console.error("========== ERROR ==========");
    console.dir(err, { depth: null });

    res.status(err.status || 500).json({
        success: false,
        message: err.message,
        error: err
    });
});

export default app;