// services/chatbotService.js
import Order from '../models/order.model.js';
import MenuItem from '../models/MenuItem.model.js';

async function startSession(deviceId) {
  let order = await Order.findOne({ deviceId });
  if (!order) {
    order = new Order({ deviceId });
    await order.save();
  }
  return order;
}

async function handleInput(deviceId, input) {
  const order = await startSession(deviceId);
  let response = '';

  switch (input) {
    case '1':
      response = await displayMenu();
      break;
    // Handle other input cases
  }

  return response;
}

async function displayMenu() {
  const menu = await MenuItem.find();
  let response = 'Menu:\n';
  menu.forEach(item => {
    response += `${item._id}. ${item.name} - $${item.price}\n`;
  });
  response += 'Select the item number to add to your order.';
  return response;
}

export { startSession, handleInput };
