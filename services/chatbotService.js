// services/chatbotService.js
import Order from '../models/order.model.js';
import MenuItem from '../models/MenuItem.model.js';

const startSession = async (deviceId) => {
  let order = await Order.findOne({ deviceId });
  if (!order) {
    order = new Order({ deviceId });
    await order.save();
  }
  return order;
}

const displayMenu = async () =>  {
  const menu = await MenuItem.find();
  let response = 'Menu:\n';
  let num = 0
  menu.forEach(item => {
    response += `${num+=1}. ${item.name} - $${item.price}\n`;
  });
  response += 'Select the item number to add to your order.';
  return response;
}

const handleInput = async (deviceId, input) => {
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



export { startSession, handleInput };
