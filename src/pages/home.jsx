import Card from '../components/card.jsx';
import Pancakes from '../assets/pancakes.jpeg';
import Waffles from '../assets/waffles.jpg';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"

function Home() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([])

    const handleAddClick = () => {
        navigate(`/addRecipe`);
    };

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        setRecipes(storedRecipes)
        console.log(storedRecipes[0])
    }, [])

    // const recipes = [
    //     { id: 1, imageUrl: Pancakes, recipeName: "Pancakes", calories: "150 Kcal", prepTime: "1 Hr" },
    //     { id: 2, imageUrl: Waffles, recipeName: "Waffles", calories: "120 Kcal", prepTime: "45 Min" },
    //     { id: 3, imageUrl: Waffles, recipeName: "Waffles", calories: "120 Kcal", prepTime: "45 Min" },
    //     { id: 4, imageUrl: Waffles, recipeName: "Waffles", calories: "120 Kcal", prepTime: "45 Min" },
    //     { id: 5, imageUrl: Waffles, recipeName: "Waffles", calories: "120 Kcal", prepTime: "45 Min" },
    //     { id: 6, imageUrl: Waffles, recipeName: "Waffles", calories: "120 Kcal", prepTime: "45 Min" },
    //     { id: 7, imageUrl: Waffles, recipeName: "Waffles", calories: "120 Kcal", prepTime: "45 Min" },
    //     { id: 8, imageUrl: Waffles, recipeName: "Waffles", calories: "120 Kcal", prepTime: "45 Min" }
    // ];
    return (
        <div style={{ paddingTop: "5px" }}>
            <div style={{ display: "flex", justifyContent: "center", fontSize: "40px", color: "white", WebkitTextStroke: "2px black", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>
                <h1><b> RECIPE MANAGER </b></h1>
            </div>

            {/* Grid container for cards */}
            <div className="card-container">
                {recipes.map(recipe => (
                    <Card 
                        key={recipe.id} 
                        id={recipe.id} 
                        imageUrl={recipe.image} 
                        recipeName={recipe.name} 
                        calories={recipe.calories} 
                        prepTime={recipe.prepTime} 
                    />
                ))}
                {/* Floating Add Button */}
                <button onClick={handleAddClick} className="add-btn">+</button>
            </div>
        </div>
    );
}

export default Home;
