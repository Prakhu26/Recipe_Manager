import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function Card({ id, imageUrl, recipeName, calories, prepTime }) { // ✅ Accept 'id' as a prop
    const imageSrc = imageUrl;
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate(`/recipe/${id}`); // ✅ Use 'id' received from props
    };

    return (
        <div className="card">
            <img className="card-image" src={imageSrc} alt={recipeName} />
            <h2 style={{display: "block",  width: "100%", textAlign: "center",  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    <b>{recipeName}</b></h2>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "50%" }}>
                    {calories}
                </div>
                <div style={{ width: "50%" }}>
                    {prepTime}
                </div>
            </div>
            <div className="view-btn-container">
                <button
                    onClick={handleViewClick} // ✅ Use correct function call
                    className="view-btn">
                    👁‍🗨 
                </button>
            </div>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.number.isRequired, // ✅ Ensure 'id' is required
    imageUrl: PropTypes.string,
    recipeName: PropTypes.string.isRequired,
    calories: PropTypes.string,
    prepTime: PropTypes.string
};

export default Card;