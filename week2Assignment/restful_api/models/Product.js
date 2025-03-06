const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    imagePath: { type: String }
});

console.log("hello world");
console.log("hello")
module.exports = mongoose.model("Product", ProductSchema);
