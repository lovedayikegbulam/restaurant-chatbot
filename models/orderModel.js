import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  items: { type: Array, default: [] },
  status: {
    type: String,
    enum: ["pending", "placed", "canceled"],
    default: "pending",
  },
  isPlacingOrder: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
