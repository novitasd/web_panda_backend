import * as dashboardRepository from "./dashboard.repository.js";

export const getStats = async () => {
    return await dashboardRepository.getStats();
};