import prisma from "../../config/prisma.js";
import * as orderRepository from "./order.repository.js";
import { generateOrderNumber } from "../../utils/generateOrderNumber.js";
import { getShippingMethod } from "./shipping.service.js";

/**
 * Obtener todos los pedidos.
 */
export const findAll = async () => {
    return await orderRepository.findAll();
};

/**
 * Obtener un pedido por ID.
 */
export const findById = async (id) => {

    const order = await orderRepository.findById(id);

    if (!order) {
        throw new Error("El pedido no existe.");
    }

    return order;

};

/**
 * Crear un pedido.
 */
export const create = async (data) => {

    const {
        customerName,
        customerLastName,
        customerPhone,
        department,
        province,
        district,
        ubigeo,
        address,
        reference,
        items
    } = data;

    if (!items || items.length === 0) {
        throw new Error("El pedido debe contener al menos un producto.");
    }

    let subtotal = 0;

    const validatedItems = [];

    for (const item of items) {

        const productSize = await prisma.productSize.findUnique({
            where: {
                productId_sizeId: {
                    productId: item.productId,
                    sizeId: item.sizeId
                }
            },
            include: {
                product: true,
                size: true
            }
        });

        if (!productSize) {
            throw new Error("Producto o talla no encontrados.");
        }

        if (productSize.stock < item.quantity) {
            throw new Error(
                `Stock insuficiente para ${productSize.product.name} talla ${productSize.size.name}.`
            );
        }

        subtotal += Number(productSize.product.price) * item.quantity;

        validatedItems.push({
            productId: item.productId,
            sizeId: item.sizeId,
            quantity: item.quantity,
            price: productSize.product.price
        });

    }

    const shipping = getShippingMethod({
        department,
        province,
        district
    });

    const shippingPrice = Number(shipping.price);

    const total = subtotal + shippingPrice;

    const orderNumber = await generateOrderNumber();

    const order = await prisma.$transaction(async (tx) => {

    const newOrder = await orderRepository.create(tx, {
    orderNumber,

    customerName,
    customerLastName,
    customerPhone,

    department,
    province,
    district,
    ubigeo,
    address,
    reference,

    shippingType: shipping.type,
    shippingName: shipping.name,
    shippingPrice,

    shippingPaymentAtDestination:
        shipping.paymentAtDestination,

    subtotal,
    total
});

    for (const item of validatedItems) {

        await orderRepository.createItem(tx, {
            orderId: newOrder.id,
            productId: item.productId,
            sizeId: item.sizeId,
            quantity: item.quantity,
            price: item.price
        });

    }

    return newOrder;

   });
    return await orderRepository.findById(order.id);

};