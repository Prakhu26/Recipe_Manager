import Home from './pages/home.jsx'
import Recipe from './pages/recipe.jsx'
import AddRecipe from './pages/addRecipe.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App(){
  return(
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App