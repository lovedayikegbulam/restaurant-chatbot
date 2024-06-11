const getOptions = () => {
  return `Select an option:\n
    1. Place an order,\n
    99. Checkout order,\n
    98. See order history,\n
    97. See current order,\n
    0. Cancel order`;
};

const getItems = () => {
  return `Select an item:\n
    2. Pizza,\n
    3. Burger,\n
    4. Pasta,\n
    5. Salad,\n
    0. Cancel,`;
};

const getOptionsInvalidSelection = () => {
  return `You entered an invalid input select:\n
    1. Place an order,\n
    99. Checkout order,\n
    98. See order history,\n
    97. See current order,\n
    0. Cancel order`;
};

const getItemsInvalidSelection = () => {
  return `You entered an invalid input select:\n
    2. Pizza,\n
    3. Burger,\n
    4. Pasta,\n
    5. Salad,\n
    0. Cancel,`;
};

const mainMenu = () => {
    return `select:\n
    1. Place an order,\n
    99. Checkout order,\n
    98. See order history,\n
    97. See current order,\n
    0. Cancel order`;
};

export {
  getItems,
  getOptions,
  getItemsInvalidSelection,
  getOptionsInvalidSelection,
  mainMenu

};
