import * as dashboardService from "./dashboard.service.js";

export const getStats = async (req, res, next) => {
    try {

        const stats = await dashboardService.getStats();

        res.status(200).json(stats);

    } catch (error) {
        next(error);
    }
};