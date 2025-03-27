const { Product } = require("../../models");
const {
  createProducts,
  getProducts,
  getOneProduct,
  updateProduct,
} = require("../../services/product/product.services");
const {
  describe,
  test,
  expect,
  beforeEach,
} = require("@jest/globals");
const products = require("../fixtures/products.json");

jest.mock("../../models");

describe("Product Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should create the product", async () => {
    const newProduct = products[0];

    Product.create.mockResolvedValue(newProduct);

    const result = await createProducts(newProduct);

    expect(Product.create).toBeCalledWith(newProduct);
    expect(result).toEqual(newProduct);
  });

  test("should get all the product", async () => {
    Product.findAll.mockResolvedValue(products);

    const result = await getProducts();

    expect(Product.findAll).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  test("should return one product by id", async () => {
    const mockProduct = products[1];

    Product.findByPk.mockResolvedValue(mockProduct);

    const result = await getOneProduct(mockProduct.id);

    expect(Product.findByPk).toHaveBeenCalledWith(mockProduct.id);
    expect(result).toEqual(mockProduct);
  });

  test("should update the product", async () => {
    const mockData = {
      data: {
        stock: 50,
        name: "Iphone 15 mini",
      },
    };

    const mockProduct = products.find((p) => p.id === 1); //gets the first product
    
    // Mock Product.findOne to return the mockProduct
    Product.findOne = jest.fn().mockResolvedValue(mockProduct);
    const mockSave = jest.fn().mockResolvedValue(mockProduct);
    mockProduct.save = mockSave;

    const result = await updateProduct(1, mockData);

    expect(result.name).toBe("Iphone 15 mini");
    expect(result.stock).toBe(50);
    expect(mockSave).toHaveBeenCalled();
  });
});
