import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, createItem, updateItem } from '../api/client';

function EditItem({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!isNew) {
      getItem(id, token)
        .then(data => {
          setName(data.name);
          setDescription(data.description || '');
        })
        .catch(() => {
        });
    }
  }, [id, isNew, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await createItem({ name, description }, token);
      } else {
        await updateItem(id, { name, description }, token);
      }
      navigate('/items');
    } catch (err) {
      console.error('Failed to save item', err);
    }
  };

  return (
    <div>
      <h1>{isNew ? 'Create object' : 'Edit object'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </div>
        <button type="submit">{isNew ? 'Create' : 'Save'}</button>
        <button type="button" onClick={() => navigate('/items')}>Cancel</button>
      </form>
    </div>
  );
}

export default EditItem;
