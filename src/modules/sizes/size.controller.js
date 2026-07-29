import * as sizeService from "./size.service.js";

/**
 * GET /sizes
 */
export const findAll = async (req, res, next) => {
    try {

        const sizes = await sizeService.findAll();

        res.status(200).json(sizes);

    } catch (error) {
        next(error);
    }
};

/**
 * GET /sizes/:id
 */
export const findById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const size = await sizeService.findById(id);

        res.status(200).json(size);

    } catch (error) {
        next(error);
    }
};

/**
 * POST /sizes
 */
export const create = async (req, res, next) => {
    try {

        const size = await sizeService.create(req.body);

        res.status(201).json({
            message: "Talla creada correctamente.",
            data: size
        });

    } catch (error) {
        next(error);
    }
};

/**
 * PUT /sizes/:id
 */
export const update = async (req, res, next) => {
    try {

        const { id } = req.params;

        const size = await sizeService.update(id, req.body);

        res.status(200).json({
            message: "Talla actualizada correctamente.",
            data: size
        });

    } catch (error) {
        next(error);
    }
};

/**
 * DELETE /sizes/:id
 */
export const remove = async (req, res, next) => {
    try {

        const { id } = req.params;

        await sizeService.remove(id);

        res.status(200).json({
            message: "Talla eliminada correctamente."
        });

    } catch (error) {
        next(error);
    }
};