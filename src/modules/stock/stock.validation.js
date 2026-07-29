import { z } from "zod";

export const createStockSchema = z.object({
    productId: z
        .uuid("El ID del producto no es válido."),

    sizeId: z
        .uuid("El ID de la talla no es válido."),

    stock: z
        .number()
        .int("El stock debe ser un número entero.")
        .min(0, "El stock no puede ser negativo.")
});

export const updateStockSchema = z.object({
    stock: z
        .number()
        .int("El stock debe ser un número entero.")
        .min(0, "El stock no puede ser negativo.")
});