import prisma from "../../config/prisma.js";

/**
 * Obtener todas las tallas.
 */
export const findAll = () => {
    return prisma.size.findMany({
        orderBy: {
            name: "asc"
        }
    });
};

/**
 * Buscar talla por ID.
 */
export const findById = (id) => {
    return prisma.size.findUnique({
        where: {
            id
        }
    });
};

/**
 * Buscar talla por nombre.
 */
export const findByName = (name) => {
    return prisma.size.findUnique({
        where: {
            name
        }
    });
};

/**
 * Crear talla.
 */
export const create = (data) => {
    return prisma.size.create({
        data
    });
};

/**
 * Actualizar talla.
 */
export const update = (id, data) => {
    return prisma.size.update({
        where: {
            id
        },
        data
    });
};

/**
 * Eliminar talla.
 */
export const remove = (id) => {
    return prisma.size.delete({
        where: {
            id
        }
    });
};