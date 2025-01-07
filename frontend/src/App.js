// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeEdit from './components/RecipeEdit';


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<RecipeList />} />
                <Route path="/new-recipe" element={<RecipeForm />} />
                <Route path="/edit-recipe/:id" element={<RecipeEdit/>} />
            </Routes>
        </Router>
    );
}

export default App;
