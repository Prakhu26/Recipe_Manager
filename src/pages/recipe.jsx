import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Recipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const selectedRecipe = storedRecipes.find(r => r.id === Number(id));

        if (!selectedRecipe) {
            navigate("/");
        } else {
            setRecipe(selectedRecipe);
        }
    }, [id, navigate]);

    function toggleAvailability(ingredientId) {
        setRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.map(ingredient =>
                ingredient.id === ingredientId
                    ? { ...ingredient, available: !ingredient.available }
                    : ingredient
            )
        }));
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function handleSave() {
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const updatedRecipes = storedRecipes.map(r => (r.id === recipe.id ? recipe : r));

        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

        toast.success("Recipe Updated Successfully!", { autoClose: 2000 });
        setIsEditing(false);
    }

    function handleCancel() {
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const selectedRecipe = storedRecipes.find(r => r.id === Number(id));
        setRecipe(selectedRecipe);
        setIsEditing(false);
    }

    function handleChange(event, field, index) {
        const value = event.target.value;
        if (field === "name") {
            setRecipe(prev => ({ ...prev, name: value }));
        } else if (field === "steps") {
            setRecipe(prev => ({
                ...prev,
                steps: prev.steps.map((step, i) => (i === index ? value : step))
            }));
        } else if (field === "ingredients") {
            setRecipe(prev => ({
                ...prev,
                ingredients: prev.ingredients.map((ing, i) => 
                    i === index ? value : ing 
                )
            }));
        }
    }    

    function handleDelete() {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
            const updatedRecipes = storedRecipes.filter(r => r.id !== Number(id));

            localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

            toast.success("Recipe deleted Successfully!", { autoClose: 2000 });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }

    if (!recipe) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="recipe-card">
            <div className="recipe-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {isEditing ? (
                    <input
                        type="text"
                        value={recipe.name}
                        onChange={e => handleChange(e, "name")}
                        style={{ fontSize: 30, fontWeight: "bold" }}
                    />
                ) : (
                    <h2 style={{ margin: 0, fontSize: 40 }}><b>{recipe.name}</b></h2>
                )}
                {!isEditing && (
                    <button className="edit-btn" onClick={handleEdit}>✏️ Edit</button>
                )}
            </div>
            
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                        {isEditing ? (
                            <input
                                type="text"
                                value={ingredient}  
                                onChange={e => handleChange(e, "ingredients", index)}
                            />
                        ) : (
                            ingredient
                        )}
                    <label style={{ position: "relative", display: "inline-block", width: "34px", height: "18px" }}>
                        <input
                            type="checkbox"
                            onChange={() => toggleAvailability(index)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                    <span className="slider"></span>
                    </label>
                </li>
            ))}
            </ul>


            <h3>Steps</h3>
            <ol style={{ paddingLeft: "10px" }}>
                {recipe.steps.map((step, index) => (
                    <li key={index} style={{ margin: "8px 0" }}>
                        {isEditing ? (
                            <input
                                type="text"
                                value={step}
                                onChange={e => handleChange(e, "steps", index)}
                            />
                        ) : (
                            step
                        )}
                    </li>
                ))}
            </ol>

            {isEditing ? (
                <div className="edit-buttons" style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                    <button className="cancel-btn" onClick={handleCancel}>⛔ Cancel</button>
                    <button className="save-btn" onClick={handleSave}>✅ Save</button>
                </div>
            ) : (
                <div className="delete-btn-container" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button className="delete-btn" onClick={handleDelete}>🗑️ Delete Recipe</button>
                </div>
            )}
        </div>
    );
}

export default Recipe;