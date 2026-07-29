import { z } from "zod";

/**
 * Crear talla
 */
export const createSizeSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "La talla es obligatoria.")
        .max(10, "La talla no puede tener más de 10 caracteres.")
});

/**
 * Actualizar talla
 */
export const updateSizeSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "La talla es obligatoria.")
        .max(10, "La talla no puede tener más de 10 caracteres.")
});