let items = [
  {
    id: 1,
    name: 'Example object',
    description: 'Exemple description for the object.'
  }
];
let currentId = 2;

function getItems() {
  return items;
}

function getItem(id) {
  return items.find(item => item.id === id);
}

function addItem(data) {
  const item = {
    id: currentId++,
    name: data.name || 'No name',
    description: data.description || ''
  };
  items.push(item);
  return item;
}

function updateItem(id, data) {
  const item = items.find(item => item.id === id);
  if (!item) {
    return null;
  }
  if (data.name !== undefined) {
    item.name = data.name;
  }
  if (data.description !== undefined) {
    item.description = data.description;
  }
  return item;
}

function deleteItem(id) {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return false;
  }
  items.splice(index, 1);
  return true;
}

module.exports = {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
};
