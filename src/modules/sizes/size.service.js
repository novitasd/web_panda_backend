import * as sizeRepository from "./size.repository.js";

/**
 * Obtener todas las tallas.
 */
export const findAll = async () => {
    return await sizeRepository.findAll();
};

/**
 * Obtener una talla por ID.
 */
export const findById = async (id) => {

    const size = await sizeRepository.findById(id);

    if (!size) {
        throw new Error("La talla no existe.");
    }

    return size;

};

/**
 * Crear una talla.
 */
export const create = async (data) => {

    const exists = await sizeRepository.findByName(data.name);

    if (exists) {
        throw new Error("La talla ya existe.");
    }

    return await sizeRepository.create(data);

};

/**
 * Actualizar una talla.
 */
export const update = async (id, data) => {

    const size = await sizeRepository.findById(id);

    if (!size) {
        throw new Error("La talla no existe.");
    }

    if (data.name !== size.name) {

        const exists = await sizeRepository.findByName(data.name);

        if (exists) {
            throw new Error("La talla ya existe.");
        }

    }

    return await sizeRepository.update(id, data);

};

/**
 * Eliminar una talla.
 */
export const remove = async (id) => {

    const size = await sizeRepository.findById(id);

    if (!size) {
        throw new Error("La talla no existe.");
    }

    return await sizeRepository.remove(id);

};