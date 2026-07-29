import prisma from "../config/prisma.js";

export const generateOrderNumber = async () => {

    const lastOrder = await prisma.order.findFirst({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            orderNumber: true
        }
    });

    if (!lastOrder) {
        return "TNIS-000001";
    }

    const lastNumber = Number(
        lastOrder.orderNumber.replace("TNIS-", "")
    );

    const nextNumber = String(lastNumber + 1).padStart(6, "0");

    return `TNIS-${nextNumber}`;

};