import MenuItem from '../models/MenuItem.model';

const menuItems = [
  { name: 'Burger', price: 5 },
  { name: 'Pizza', price: 8 },
  { name: 'Pasta', price: 7 }
];

MenuItem.insertMany(menuItems)
  .then(() => console.log('Menu items initialized'))
  .catch(err => console.error('Error initializing menu items:', err));
