import {Order} from '../models/orderModel.js';
import {getItems, getItemsInvalidSelection, getOptionsInvalidSelection, mainMenu} from "../utils/order.selection.js"


export const handleUserSelection = async (sessionId, selection) => {
  let response = '';

  // Fetch the current pending order
  let order = await Order.findOne({ sessionId, status: 'pending' });

  // Handle the case where the order is not found
  if (!order) {
    if (selection === '1') {
      order = new Order({ sessionId, items: [], status: 'pending', isPlacingOrder: true });
      await order.save();
      response = getItems();
    } else {
      switch (selection) {
        case '99':
          response = `No order to place, ${mainMenu()}`;
          break;
        case '98':
          const orderHistory = await Order.find({ sessionId, status: 'placed' });
          response = orderHistory.length > 0 ? `Order history: ${orderHistory.map(o => o.items.join(', ')).join('; ')}` : 'No order history.';
          break;
        case '97':
          response = `No current order, ${mainMenu()}`;
          break;
        case '0':
          response = `No order to cancel, ${mainMenu()}`;
          break;
        default:
          response = getOptionsInvalidSelection();
      }
    }
  } else {
    switch (selection) {
      case '99':
        if (order.items.length > 0) {
          order.status = 'placed';
          order.isPlacingOrder = false;
          await order.save();
          response = `Order placed, ${mainMenu()}`;
        } else {
          response = `No order to place, ${mainMenu()}`;
        }
        break;
      case '98':
        const orderHistory = await Order.find({ sessionId, status: 'placed' });
        response = orderHistory.length > 0 ? `Order history: ${orderHistory.map(o => o.items.join(', ')).join('; ')}` : `No order history, ${mainMenu()}`;
        break;
      case '97':
        response = `Current order: ${order.items.join(', ')}`;
        break;
      case '0':
        order.status = 'canceled';
        order.isPlacingOrder = false;
        await order.save();
        response = `Order canceled, ${mainMenu()}`;
        break;
      default:
        if (order.isPlacingOrder) {
          const items = ['Pizza', 'Burger', 'Pasta', 'Salad'];
          const itemIndex = parseInt(selection, 10) - 2; // Adjust index to match new item numbers
          if (items[itemIndex]) {
            order.items.push(items[itemIndex]);
            await order.save();
            response = `Added ${items[itemIndex]} to your order. Select more items or 99 to checkout.`;
          } else {
            response = getItemsInvalidSelection();
          }
        } else {
          response = getItemsInvalidSelection();
        }
    }
  }

  return response;
};
