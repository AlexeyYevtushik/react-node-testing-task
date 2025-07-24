import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getItems, deleteItem } from '../api/client';

function Items({ token }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getItems(token);
        setItems(data);
      } catch (err) {
        setError('Failed to load the list of items');
      }
    }
    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this item?');
    if (!confirmDelete) return;
    try {
      await deleteItem(id, token);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete the item');
    }
  };

  return (
    <div>
      <h1>List of objects</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}{": "}
            <button testid="edit-button" onClick={() => navigate(`/items/${item.id}/edit`)}>Edit</button>
            <button testid="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link testid="add-new-button" to="/items/new/edit">add new</Link>
    </div>
  );
}

export default Items;
