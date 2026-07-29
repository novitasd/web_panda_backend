import * as productSizeService from "./product-size.service.js";

export const create = async (req, res, next) => {

    try {

        const productSize = await productSizeService.create(req.body);

        res.status(201).json({
            message: "Talla asignada correctamente.",
            data: productSize
        });

    } catch (error) {
        next(error);
    }

};