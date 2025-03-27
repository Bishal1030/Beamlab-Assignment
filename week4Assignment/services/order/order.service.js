const {Order} = require('../../models')
const {Product} = require('../../models')
const {client} = require('../../config/redis')
const { sequelize } = require('../../models');

const createOrder = async (productId, quantity) => {
    const t = await sequelize.transaction();  // Start transaction

    try {
        const product = await Product.findByPk(productId, { transaction: t });

        if (!product) {
            throw new Error('Product not found');
        }

        const totalPrice = product.price * quantity;
        console.log(totalPrice);

        const order = await Order.create({
            productId: product.id,
            quantity,
            totalPrice,
        }, { transaction: t });

        const serializedOrder = JSON.stringify(order);
        await client.setEx(`order:${order.id}`, 3600, serializedOrder);

        await t.commit(); 
        return order;

    } catch (error) {
        await t.rollback(); 
        throw error;
    }
};

const getAllOrder = async() => { 
    const keys = await client.keys('order:*');
    if(keys){
        
        const orders = await client.mGet(keys);

        return orders.map(order => JSON.parse(order));
    }
    return await Order.findAll()
}

const deleteOrder = async(id) => {
    return await Order.destroy({where: {id:id}})
}

module.exports = {createOrder, getAllOrder, deleteOrder}