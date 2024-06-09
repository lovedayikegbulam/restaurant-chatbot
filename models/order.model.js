import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
