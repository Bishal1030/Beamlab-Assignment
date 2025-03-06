// Example: Using Express Router with RESTful route conventions
// we will be doing this in route file

const express = require("express");
const router = express.Router();
const product = require('../models/Product.js')

// Retrieve all products
router.get("/", (req, res) => {
    const getUsers = product.find() 
    console.log(getUsers)   
    res.status(200).json({ message: "Retrieve all users" });
});

// Retrieve a specific product by ID
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const getProduct = product.findById(id)
    res.status(200).json({ message: `Retrieved user with id`, data: getProduct });
});

// - Create a new product
router.post("/", async(req, res) => {

    const createProduct = await product.create({...req.body})
    res.status(201).json({ message: "User created successfully",data: createProduct  });
});

//Update an existing product entirely
router.put("/:id", (req, res) => {
    const {name, category} = req.body;

    const updateProduct = product.findByIdAndUpdate({name: name, category: category})
    res.status(200).json({ message: `User with id ${req.params.id} updated successfully` });
});

// DELETE /api/v1/users/:id - Delete a user
router.delete("/:id", (req, res) => {
    const {id} = req.params.id;
    const deleteUser = product.findByIdAndDelete(id)
    res.status(200).json({ message: `User with id ${req.params.id} deleted` });
});

module.exports = router;