const {Order} = require('../../models')
const {Product} = require('../../models')

const createOrder = async(productId, quantity) => {
    const product = await Product.findByPk(productId) 
    
    if (!product) {
        throw new Error('Product not found');
    }

    const totalPrice = product.price * quantity
    console.log(totalPrice)

    return await Order.create({
        productId : product.id,
        quantity,
        totalPrice,
        include: [{
            model: Product,
            attributes: ['name'] 
        }]
    })
}

const getAllOrder = async() => { 
    return await Order.findAll()
}

const deleteOrder = async(id) => {
    return await Order.destroy({where: {id:id}})
}

module.exports = {createOrder, getAllOrder, deleteOrder}