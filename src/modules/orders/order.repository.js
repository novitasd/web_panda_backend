import prisma from "../../config/prisma.js";

/**
 * Obtener todos los pedidos.
 */
export const findAll = () => {
    return prisma.order.findMany({
        include: {
            items: {
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
 * Buscar pedido por ID.
 */
export const findById = (id) => {
    return prisma.order.findUnique({
        where: {
            id
        },
        include: {
            items: {
                include: {
                    product: true,
                    size: true
                }
            }
        }
    });
};

/**
 * Crear pedido.
 */
export const create = (tx, data) => {
    return tx.order.create({
        data
    });
};

/**
 * Crear item del pedido.
 */
export const createItem = (tx, data) => {
    return tx.orderItem.create({
        data
    });
};

/**
 * Actualizar pedido.
 */
export const update = (tx, id, data) => {
    return tx.order.update({
        where: {
            id
        },
        data
    });
};

/**
 * Buscar pedido por ID usando una transacción.
 */
export const findByIdTx = (tx, id) => {
    return tx.order.findUnique({
        where: {
            id
        },
        include: {
            items: true
        }
    });
};