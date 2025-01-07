
// src/components/RecipeForm.js
import React, { useState } from 'react';

const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecipe = { title, description, instructions };

        fetch('http://localhost:8080/recepti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
        })
        .then(() => {
            window.location.href = '/';
        })
        .catch(error => console.error('Error adding recipe:', error));
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Add New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Ingredients:</label>
                    <textarea 
                        className="form-control" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required
                    ></textarea>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Instructions:</label>
                    <textarea 
                        className="form-control" 
                        value={instructions} 
                        onChange={(e) => setInstructions(e.target.value)} 
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default RecipeForm;
