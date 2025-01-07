// src/components/RecipeEdit.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeEdit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/recepti/${id}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setDescription(data.description);
                setInstructions(data.instructions);
            })
            .catch(error => console.error('Error fetching recipe:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedRecipe = { title, description, instructions };

        fetch(`http://localhost:8080/recepti/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRecipe),
        })
        .then(() => {
            window.location.href = '/';
        })
        .catch(error => console.error('Error updating recipe:', error));
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Edit Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group mb-3">
                    <label htmlFor="description">Ingredients:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group mb-3">
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea
                        className="form-control"
                        id="instructions"
                        rows="5"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default RecipeEdit;
