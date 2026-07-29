import prisma from "../../config/prisma.js";
import * as orderRepository from "./order.repository.js";

export const confirmPayment = async (orderId) => {

    return await prisma.$transaction(async (tx) => {

        const order = await orderRepository.findByIdTx(tx, orderId);

        if (!order) {
            throw new Error("El pedido no existe.");
        }

        if (order.status !== "PENDING") {
            return order;
        }

        for (const item of order.items) {

            await tx.productSize.update({
                where: {
                    productId_sizeId: {
                        productId: item.productId,
                        sizeId: item.sizeId
                    }
                },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });

            const productSize = await tx.productSize.findUnique({
                where: {
                    productId_sizeId: {
                        productId: item.productId,
                        sizeId: item.sizeId
                    }
                }
            });

            await tx.inventoryMovement.create({
                data: {
                    productSizeId: productSize.id,
                    type: "SALE",
                    quantity: item.quantity,
                    reason: `Pedido ${order.orderNumber}`
                }
            });

        }

        await orderRepository.update(tx, order.id, {
            status: "PAID"
        });

        return await orderRepository.findByIdTx(tx, order.id);

    });

};