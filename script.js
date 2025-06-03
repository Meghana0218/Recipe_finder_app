document.getElementById("search-btn").addEventListener("click", function () {
  const query = document.getElementById("search-input").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  if (query === "") {
    resultsDiv.innerHTML = "<p>Please enter a recipe name.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Loading recipes...</p>";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      resultsDiv.innerHTML = ""; // Clear loading message

      if (data.meals === null) {
        resultsDiv.innerHTML = "<p>No recipes found.</p>";
        return;
      }

      data.meals.forEach((meal) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe");
        recipeCard.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 200)}...</p>
          <a href="${meal.strSource || "#"}" target="_blank" rel="noopener noreferrer">View Recipe</a>
        `;
        resultsDiv.appendChild(recipeCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching recipe:", error);
      resultsDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
    });
});


