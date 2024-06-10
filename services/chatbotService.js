import { Order } from '../models/orderModel.js';

export const getOptions = () => {
  return `Select an option:\n
  1. Place an order\n
  99. Checkout order\n
  98. See order history\n
  97. See current order\n
  0. Cancel order`;
};


export const getItems = () => {
  return `Select an item:
  1. Pizza
  2. Burger
  3. Pasta
  4. Salad
  0. Cancel`;
};

export const handleUserSelection = async (sessionId, selection) => {
  let response = '';
  let order = await Order.findOne({ sessionId, status: 'pending' });

  switch (selection) {
    case '1':
      response = getItems();
      break;
    case '99':
      if (order && order.items.length > 0) {
        order.status = 'placed';
        await order.save();
        response = 'Order placed. Select 1 to place a new order.';
      } else {
        response = 'No order to place. Select 1 to place an order.';
      }
      break;
    case '98':
      const orderHistory = await Order.find({ sessionId, status: 'placed' });
      response = orderHistory.length > 0 ? `Order history: ${orderHistory.map(o => o.items).join(', ')}` : 'No order history.';
      break;
    case '97':
      response = order ? `Current order: ${order.items.join(', ')}` : 'No current order.';
      break;
    case '0':
      if (order) {
        order.status = 'canceled';
        await order.save();
        response = 'Order canceled.';
      } else {
        response = 'No order to cancel.';
      }
      break;
    default:
      if (order) {
        const items = ['Pizza', 'Burger', 'Pasta', 'Salad'];
        const itemIndex = parseInt(selection, 10) - 1;
        if (items[itemIndex]) {
          order.items.push(items[itemIndex]);
          await order.save();
          response = `Added ${items[itemIndex]} to your order. Select more items or 99 to checkout.`;
        } else {
          response = 'Invalid selection.';
        }
      } else {
        response = 'Invalid selection.';
      }
  }

  return response;
};
