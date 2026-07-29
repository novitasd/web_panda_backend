import * as movementRepository from "./movement.repository.js";
import prisma from "../../config/prisma.js";

/**
 * Obtener todos los movimientos.
 */
export const findAll = async () => {
    return await movementRepository.findAll();
};

/**
 * Obtener un movimiento por ID.
 */
export const findById = async (id) => {

    const movement = await movementRepository.findById(id);

    if (!movement) {
        throw new Error("El movimiento no existe.");
    }

    return movement;

};

/**
 * Crear movimiento de inventario.
 */
export const create = async (data) => {

    const { productSizeId, type, quantity, reason } = data;

    const productSize = await prisma.productSize.findUnique({
        where: {
            id: productSizeId
        }
    });

    if (!productSize) {
        throw new Error("El inventario no existe.");
    }

    let newStock = productSize.stock;

    switch (type) {

        case "ENTRY":
            newStock += quantity;
            break;

        case "SALE":
            if (productSize.stock < quantity) {
                throw new Error("Stock insuficiente.");
            }

            newStock -= quantity;
            break;

        case "ADJUSTMENT":
            newStock = quantity;
            break;

        default:
            throw new Error("Tipo de movimiento inválido.");

    }

    const movement = await prisma.$transaction(async (tx) => {

        await tx.productSize.update({
            where: {
                id: productSizeId
            },
            data: {
                stock: newStock
            }
        });

        return await tx.inventoryMovement.create({
            data: {
                productSizeId,
                type,
                quantity,
                reason
            }
        });

    });

    return movement;

};