import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Meal.scss'; // Assurez-vous que le chemin est correct
import api from '../../api/axios';
import { useAuthContext } from '../../context/authenticationContext'; 

const AddMealForm = ({ setOpenModal }) => {
  const {authUser } = useAuthContext();
  const history = useNavigate();

  const [name, setName] = useState('');
  const [region, setRegion] = useState(''); 
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [steps, setSteps] = useState([{ rank: 1, description: '' }]);
  const [newIngredient, setNewIngredient] = useState('');
  const [newGrammageValue, setNewGrammageValue] = useState('');
  const [newGrammageUnit, setNewGrammageUnit] = useState('g');
  const [thumbnail, setThumbnail] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
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

  const handleAddStep = () => {
    setSteps([...steps, { rank: steps.length + 1, description: '' }]);
  };

  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = steps.map((step, i) => 
      i === index ? { ...step, [field]: value } : step
    );
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const duration = parseInt(hours) * 60 + parseInt(minutes);
  
    try {
      const response = await fetch("http://localhost:3000/meal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            region,
            description,
            duration,
            steps,
            thumbnail,
          }),
        })
      ;
      
      console.log("heloo", response);
  
      if (response.status === 200) {
        setName('');
        setRegion('');
        setDescription('');
        setHours('');
        setMinutes('');
        setSteps([{ rank: 1, description: '' }]);
        setThumbnail(null);
        history.push('/');
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  
  return (
    <div className="modalBackground">
      <div className="modalContent">
        <button
          onClick={() => setOpenModal(false)}
          className="closeButton"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 style={{ color: '#7b1c27', textAlign: 'center', paddingBottom: '20px' }}>
          Add a new recipe
        </h2>
        <form onSubmit={handleSubmit}>
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
            <label style={{ color: '#7b1c27', fontWeight: 'bold' }}>Steps:</label>
            {steps.map((step, index) => (
              <div key={index} style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Rank"
                  value={step.rank}
                  onChange={(e) => handleStepChange(index, 'rank', e.target.value)}
                  style={{
                    width: '10%',
                    padding: '8px',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <textarea
                  placeholder="Description"
                  value={step.description}
                  onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                  style={{
                    width: '80%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '10px',
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#7b1c27',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddStep}
              style={{
                padding: '8px',
                backgroundColor: '#7b1c27',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Add Step
            </button>
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
  );
};

export default AddMealForm;
