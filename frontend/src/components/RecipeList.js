// src/components/RecipeList.js
import React, { useEffect, useState } from 'react';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');  //State for search query
    const [filteredRecipes, setFilteredRecipes] = useState([]);  //State for filtered recipes

    useEffect(() => {
        fetch('http://localhost:8080/recepti')
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setFilteredRecipes(data); // Initialize filtered recipes
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    const deleteRecipe = (id) => {
        fetch(`http://localhost:8080/recepti/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
            setRecipes(updatedRecipes);
            setFilteredRecipes(updatedRecipes);
        })
        .catch(error => console.error('Error deleting recipe:', error));
    };

    //search input function
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // filter recipes
        const filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query)
        );
        setFilteredRecipes(filtered);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Recipe List</h1>

            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search recipes by title"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <button 
                className="btn btn-success mb-3" 
                onClick={() => window.location.href = '/new-recipe'}>
                Add New Recipe
            </button>

            <div className="row">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <div key={recipe.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">{recipe.title}</h2>
                                    <div className="card-text mb-2">
                                        <strong>Description:</strong>
                                        <div className="p-2 border rounded bg-light">{recipe.description}</div>
                                    </div>
                                    <div className="card-text mb-2">
                                        <strong>Instructions:</strong>
                                        <div className="p-2 border rounded bg-light">{recipe.instructions}</div>
                                    </div>
                                    <button 
                                        className="btn btn-warning me-2" 
                                        onClick={() => window.location.href = `/edit-recipe/${recipe.id}`}>
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => deleteRecipe(recipe.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found</p> 
                )}
            </div>
        </div>
    );
};

export default RecipeList;
