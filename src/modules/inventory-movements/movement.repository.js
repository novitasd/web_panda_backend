import prisma from "../../config/prisma.js";

/**
 * Obtener todos los movimientos.
 */
export const findAll = () => {
    return prisma.inventoryMovement.findMany({
        include: {
            productSize: {
                include: {
                    product: true,
                    size: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

/**
 * Buscar movimiento por ID.
 */
export const findById = (id) => {
    return prisma.inventoryMovement.findUnique({
        where: {
            id
        },
        include: {
            productSize: {
                include: {
                    product: true,
                    size: true
                }
            }
        }
    });
};

/**
 * Crear movimiento.
 */
export const create = (tx, data) => {
    return tx.inventoryMovement.create({
        data
    });
};