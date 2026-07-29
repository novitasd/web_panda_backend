import * as stockService from "./stock.service.js";

/**
 * GET /stock
 */
export const findAll = async (req, res, next) => {
    try {

        const stock = await stockService.findAll();

        res.status(200).json(stock);

    } catch (error) {
        next(error);
    }
};

/**
 * GET /stock/:productId
 */
export const findByProduct = async (req, res, next) => {
    try {

        const { productId } = req.params;

        const stock = await stockService.findByProduct(productId);

        res.status(200).json(stock);

    } catch (error) {
        next(error);
    }
};


