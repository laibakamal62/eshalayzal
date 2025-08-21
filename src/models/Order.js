import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  formData: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
        contactNumber: { type: String, required: true }, // ✅ added field

    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  cartItems: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      size: { type: String },
      color: { type: String },
    },
  ],
  total: { type: Number, required: true },
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);