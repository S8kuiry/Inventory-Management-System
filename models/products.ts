import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    lowStockAt: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product =  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product