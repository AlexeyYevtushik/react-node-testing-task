const express = require('express');
const router = express.Router();
const store = require('../store/memoryStore');

// Получить список всех объектов
router.get('/', (req, res) => {
  const items = store.getItems();
  res.json(items);
});

// Получить один объект по ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = store.getItem(id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// Создать новый объект
router.post('/', (req, res) => {
  const data = req.body;
  const newItem = store.addItem(data);
  res.status(201).json(newItem);
});

// Обновить существующий объект по ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const updatedItem = store.updateItem(id, data);
  if (!updatedItem) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(updatedItem);
});

// Удалить объект по ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = store.deleteItem(id);
  if (!success) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.sendStatus(204);
});

module.exports = router;
