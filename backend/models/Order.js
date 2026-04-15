import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null },
    name: String,
    email: String,
    amount: Number,
    phone: String,
    address: String,
    title: String,
    description: String,
    items: [String],
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
  },
  { collection: "orders" },
);

export default mongoose.model("Order", orderSchema);
