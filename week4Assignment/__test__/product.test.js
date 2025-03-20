const { Product } = require('../models');
const { createProducts, getProducts, getOneProduct, updateProduct } = require('../services/product/product.services');
const { describe, test, expect, beforeEach, afterEach } = require('@jest/globals');
const products = require('../__test__/fixtures/products.json')

jest.mock('../models')

describe('Product Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('should create the product', async() => {
        const newProduct = products[0]

        Product.create.mockResolvedValue(newProduct);

        const result = await createProducts(newProduct)

        expect(Product.create).toBeCalledWith(newProduct)
        expect(result).toEqual(newProduct)

    })

    test('should get all the product', async() => {
        Product.findAll.mockResolvedValue(products)

        const result = await getProducts()

        expect(Product.findAll).toHaveBeenCalled()
        expect(result).toEqual(products)
    })

    test('should return one product by id', async() => {
        const mockProduct = products[1];

        Product.findByPk.mockResolvedValue(mockProduct)

        const result = await getOneProduct(mockProduct.id)

        expect(Product.findByPk).toHaveBeenCalledWith(mockProduct.id)
        expect(result).toEqual(mockProduct)
    })

    
})