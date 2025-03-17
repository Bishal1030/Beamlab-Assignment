const { where } = require('sequelize')
const {Product} = require('../../models')

const createProducts = async(productData) => {
    return await Product.create(productData)

}

const getProducts = async() => {
    return await Product.findAll()
}

const getOneProduct = async(id) => {
    return await Product.findByPk(id)
}

const updateProduct = async (id, productData) => {
    console.log(productData)
    const product = await Product.findOne({where:{id:id}});
    if (!product) return null;
    product.stock = productData.data.stock || product.stock;
    product.name = productData.data.name || product.name;
    await product.save(); 
    return product;
}


module.exports = {createProducts,getProducts,getOneProduct,updateProduct}

