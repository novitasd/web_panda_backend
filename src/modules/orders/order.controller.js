import * as orderService from "./order.service.js";

/**
 * Obtener todos los pedidos.
 */
export const findAll = async (req, res, next) => {
    try {

        const orders = await orderService.findAll();

        res.status(200).json(orders);

    } catch (error) {
        next(error);
    }
};

/**
 * Obtener un pedido por ID.
 */
export const findById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const order = await orderService.findById(id);

        res.status(200).json(order);

    } catch (error) {
        next(error);
    }
};

/**
 * Crear pedido.
 */
export const create = async (req, res, next) => {
    try {

        const order = await orderService.create(req.body);

        res.status(201).json({
            message: "Pedido creado correctamente.",
            data: order
        });

    } catch (error) {
        next(error);
    }
};