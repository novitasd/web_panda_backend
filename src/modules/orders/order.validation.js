import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .max(100),

  customerLastName: z
    .string()
    .trim()
    .min(1, "El apellido es obligatorio.")
    .max(100),

  customerPhone: z
    .string()
    .trim()
    .min(9, "El teléfono no es válido.")
    .max(20),

  department: z
    .string()
    .trim()
    .min(1, "El departamento es obligatorio."),

  province: z
    .string()
    .trim()
    .min(1, "La provincia es obligatoria."),

  district: z
    .string()
    .trim()
    .min(1, "El distrito es obligatorio."),

  ubigeo: z
    .string()
    .trim()
    .min(1, "El ubigeo es obligatorio."),

  address: z
    .string()
    .trim()
    .min(1, "La dirección es obligatoria.")
    .max(250),

  reference: z
    .string()
    .trim()
    .max(250)
    .optional()
    .or(z.literal("")),

  items: z
    .array(
      z.object({
        productId: z.uuid("El ID del producto no es válido."),
        sizeId: z.uuid("El ID de la talla no es válido."),
        quantity: z
          .number()
          .int("La cantidad debe ser un número entero.")
          .min(1, "La cantidad debe ser mayor que cero."),
      })
    )
    .min(1, "El pedido debe contener al menos un producto."),
});