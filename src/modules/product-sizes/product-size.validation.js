import { z } from "zod";

export const createProductSizeSchema = z.object({

    productId: z
        .string()
        .uuid("El ID del producto no es válido."),

    sizeId: z
        .string()
        .uuid("El ID de la talla no es válido.")

});