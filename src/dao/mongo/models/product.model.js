import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    code: {
       type: String,
       unique: true,
       require: true,
    },
    category: {
        type: String,
        require: true,
    },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "users" }
});


const ProductModel = mongoose.model("products", productSchema)

export default ProductModel