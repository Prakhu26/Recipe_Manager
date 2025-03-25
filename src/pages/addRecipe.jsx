import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        name: "",
        calories: "",
        prepTime: "",
        ingredients: "",
        steps: "",
        image: null
    }); 

    function handleChange(event) {
        const { name, value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            [name]: value,
        }));
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setRecipe((prevRecipe) => ({
                    ...prevRecipe,
                    image: reader.result, // Save Base64 encoded image
                }));
            };
        }
    }     

    const defaultImage = "src/assets/ducky.jpg"; // Default image URL

    function saveRecipe(event) {
        event.preventDefault();

        const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

        const newRecipe = { 
        id: Date.now(),
        ...recipe, 
        image: recipe.image || defaultImage, 
        ingredients: recipe.ingredients.split(","),
        steps: recipe.steps.split(",")
        };

        localStorage.setItem("recipes", JSON.stringify([...existingRecipes, newRecipe]));
        
        toast.success("Recipe Saved Successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setTimeout(() => {
            navigate("/");
        }, 2000); 
        
    }

    function refreshForm() {
        setRecipe({ name: "", calories: "", prepTime: "", ingredients: "", steps: "", image: null });
    }

    return (
        <div className="addRecipe-card">
            <h1 style={{ fontSize: "50px", textAlign: "center"}}>Add Recipe</h1>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "left", marginBottom: "20px", position: "relative" }}>
                <img 
                    src={recipe.image || defaultImage} 
                    alt="Recipe Preview" 
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }} 
                /> 
                <label htmlFor="imageUpload" style={{ marginBottom: "5px" }}>Recipe Image</label>
                <input type="file" required id="imageUpload" accept="image/*" onChange={handleImageChange} style={{ textAlign: "left" }} />
            </div>

            <form onSubmit={saveRecipe} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
               
                <label htmlFor="recipeName">Recipe Name</label>
                <input type="text" required id="recipeName" name="name" placeholder="Chocolate Cake!" value={recipe.name} onChange={handleChange} />

                <label htmlFor="calories">Calories per Serving</label>
                <input type="text" required id="calories" name="calories" placeholder="150 kcal" value={recipe.calories} onChange={handleChange} />

                <label htmlFor="prepTime">Prep Time</label>
                <input type="text" required id="prepTime" name="prepTime" placeholder="1 hr 10 min (Separate the steps using commas)" value={recipe.prepTime} onChange={handleChange} />

                <label htmlFor="ingredients">Ingredients</label>
                <input type="text" required id="ingredients" name="ingredients" placeholder="Flour- 1 cup" value={recipe.ingredients} onChange={handleChange} />

                <label htmlFor="steps">Steps</label>
                <input type="text" required id="steps" name="steps" placeholder="(Separate the steps using commas)" value={recipe.steps} onChange={handleChange} />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <button type="button" className="refresh-btn" onClick={refreshForm}>🔄 Refresh</button>
                    <button type="submit" className="save-btn">✅ Save</button>
                </div>
            </form>
        </div>
    );
}

export default AddRecipe;