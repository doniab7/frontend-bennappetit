import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Meal.scss';
import api from '../../api/axios';

const AddMealForm = ({ setOpenModal }) => {
  const history = useNavigate();

  const [name, setName] = useState('');
  const [region, setRegion] = useState(''); 
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const [newIngredient, setNewIngredient] = useState('');
  const [newGrammageValue, setNewGrammageValue] = useState('');
  const [newGrammageUnit, setNewGrammageUnit] = useState('g'); // Unité par défaut : gramme

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
  };

  const handleAddIngredient = () => {
    if (newIngredient && newGrammageValue !== '' && newGrammageUnit !== '') {
      const ingredient = {
        name: newIngredient,
        grammage: `${newGrammageValue} ${newGrammageUnit}`,
      };
      setNewIngredient('');
      setNewGrammageValue('');
      setNewGrammageUnit('g');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalDuration = parseInt(hours) * 60 + parseInt(minutes);
    try {
      const response = await api.post('/meal/create', {
        name,
        region,
        description,
        duration: totalDuration, 
      });
      if (response.status === 200) {
        setName('');
        setRegion('');
        setDescription('');
        setHours('');
        setMinutes('');
        history.push('/');
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContent">
        <div style={{ position: 'relative' }}>
          <h2 style={{ color: '#7b1c27', textAlign: 'center', paddingBottom: '20px' }}>
            Add a new recipe
          </h2>
          <form onSubmit={handleSubmit}>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              style={{
                position: 'absolute',
                top: '1px',
                right: '1px',
                padding: '1px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                zIndex: '1',
              }}
            >
              <FontAwesomeIcon icon={faTimes} style={{ color: '#7b1c27', fontSize: '20px' }} />
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ flex: '1', marginRight: '10px' }}>
                <label style={{ color: '#7b1c27', fontWeight: 'bold' }}>Recipe Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  required
                />
              </div>
              <div style={{ flex: '1' }}>
                <label style={{ color: '#7b1c27', fontWeight: 'bold' }}>Region:</label>
                <input
                  type="text"
                  name="region"
                  onChange={(e) => setRegion(e.target.value)} 
                  value={region} 
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#7b1c27', fontWeight: 'bold' }}>Ingredients:</label>
              {/* <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.grammage}
                  </li>
                ))}
              </ul> */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="New ingredient"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  style={{
                    width: '30%',
                    padding: '8px',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <input
                  type="number"
                  placeholder="Grammage"
                  value={newGrammageValue}
                  onChange={(e) => setNewGrammageValue(e.target.value)}
                  style={{
                    width: '30%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '5px',
                  }}
                />
                <select
                  value={newGrammageUnit}
                  onChange={(e) => setNewGrammageUnit(e.target.value)}
                  style={{
                    width: '10%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="piece">piece</option>
                  <option value="spoon">spoon</option>
                  <option value="toServe">toServe</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  style={{
                    marginLeft: '10px',
                    padding: '8px',
                    backgroundColor: '#7b1c27',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Add ingredient
                </button>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#7b1c27', fontWeight: 'bold' }}>Preparation Time:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="number"
                  name="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  style={{
                    width: '33%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '5px',
                  }}
                  placeholder="Hours"
                />
                <input
                  type="number"
                  name="Minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  style={{
                    width: '33%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '5px',
                  }}
                  placeholder="Minutes"
                />
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '15px', alignItems: 'center' }}>
              <div style={{ flex: '1', marginRight: '10px' }}>
                <label style={{ color: '#7b1c27', fontWeight: 'bold' }}>Description:</label>
                <textarea
                  name="description"
                  onChange={(e) => setDescription(e.target.value)} 
                  value={description} 
                  style={{
                    width: '100%',
                    height: '9rem',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  required
                />
              </div>
              <div style={{ flex: '1' }}>
                <label style={{ color: '#7b1c27', fontWeight: 'bold' }}>Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={{
                    width: '100%',
                    height: '10rem',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#7b1c27',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'block',
                width: '100%',
              }}
            >
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMealForm;
