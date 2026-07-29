import { z } from "zod";

export const createMovementSchema = z.object({
    productSizeId: z.uuid("El ID del inventario no es válido."),

    type: z.enum(
        ["ENTRY", "SALE", "ADJUSTMENT"],
        {
            error: "Tipo de movimiento inválido."
        }
    ),

    quantity: z
        .number()
        .int("La cantidad debe ser un número entero.")
        .min(0, "La cantidad no puede ser negativa."),

    reason: z
        .string()
        .trim()
        .max(255, "La observación no puede superar los 255 caracteres.")
        .optional()
});