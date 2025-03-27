const productService = require('../services/product/product.services.js')


const createProduct = async(req,res) => {
    const {name, description, price,stock} = req.body;
    if(!name || !description || !price || !stock){
        return res.status(401).json({message: "every fields are required"})
    }
    const product = await productService.createProducts({name,description,price,stock})
    
    res.status(201).json({message: "Product created successfully", data: product})

}

const getAllProduct = async(req,res) => {

    const getProduct = await productService.getProducts();
    if(!getProduct.length){
        return res.status(404).json({message: "There is no product Available"})
    }
    res.status(201).json({message: "Available Products", data: getProduct})
}

const getSingleProduct = async(req,res) => {

    const singleProduct = await productService.getOneProduct(req.params.id);
    if(!singleProduct){
        return res.status(404).json({message: "product cannot be found! please enter valid id"})
    }

    return res.status(201).json({message: "found successfully", data: singleProduct})
}

const updateSingleProduct = async(req, res) => {
    const { id } = req.params;

    try {
        const updatedProduct = await productService.updateProduct(id, req.body);
        if (!updatedProduct) {
            return res.status(400).json({ message: "Failed to update product" });
        }

        // console.log(updatedProduct);
        res.status(200).json({ message: "product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the product" });
    }
}


module.exports = {createProduct, getAllProduct,getSingleProduct, updateSingleProduct}

