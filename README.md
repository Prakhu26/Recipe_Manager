# Recipe_Manager
Overview
A simple web application that allows users to manage their recipes and ingredients. The app focuses on creating and viewing recipe details while helping users track which ingredients are available and which are missing.

Features
1.	Recipe List Page (/)
a.	Display a list of recipes.
b.	Each recipe shows its name, image, and a View Details button.
2.	Recipe Details Page (/recipe/:id)
a.	Display a detailed recipe, including:
i.	Ingredients list (available and missing ingredients).
ii.	Steps to prepare the recipe.
b.	Highlight missing ingredients in red.
3.	Ingredient Availability Management
a.	Users can mark ingredients as available or unavailable on the details page.
b.	Update the availability list in local storage.
4.	Add Recipe Functionality
a.	Users can add a new recipe with:
i.	Recipe name
ii.	Ingredients list (comma-separated)
iii.	Steps to prepare
iv.	Title
v.	Image (optional)
5.	Error Handling and Validation
a.	Display toast errors for missing required fields in the form.
b.	Success messages when recipes are added or ingredients updated.
6.	State Management
a.	Use useState for managing recipes and ingredients.
b.	Use useEffect to load and save data from local storage.
7.	Responsive Design
a.	Mobile: Recipes appear in a single-column card list.
b.	Desktop/Tablet: Grid layout for better presentation.

Tools and Libraries
•	React.js for core functionality.
•	React Router for navigation.
•	React-Toastify for notifications.
•	Local Storage for saving recipes and ingredient availability.

