const {Product} = require('../../models')
const {client} = require('../../config/redis.js')



const createProducts = async(productData) => {

    const product =  await Product.create(productData)
    const id = product.id
    const serializedData = JSON.stringify(product)
    await client.setEx(`product:${id}`, 3600, serializedData)
    return product;
}

const getProducts = async() => {
    return await Product.findAll()
}

const getOneProduct = async(id) => {

    const cachedProduct = await client.get(`product:${id}`)
    if (cachedProduct){
        const parseData = JSON.parse(cachedProduct)
        return parseData;
    }
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

