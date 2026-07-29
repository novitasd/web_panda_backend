import * as movementService from "./movement.service.js";

/**
 * Obtener todos los movimientos.
 */
export const findAll = async (req, res, next) => {
    try {

        const movements = await movementService.findAll();

        res.status(200).json(movements);

    } catch (error) {
        next(error);
    }
};

/**
 * Obtener movimiento por ID.
 */
export const findById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const movement = await movementService.findById(id);

        res.status(200).json(movement);

    } catch (error) {
        next(error);
    }
};

/**
 * Crear movimiento.
 */
export const create = async (req, res, next) => {
    try {

        const movement = await movementService.create(req.body);

        res.status(201).json({
            message: "Movimiento registrado correctamente.",
            data: movement
        });

    } catch (error) {
        next(error);
    }
};