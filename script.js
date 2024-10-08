// script.js

// Movie class to represent each movie node in the graph
class Movie {
    constructor(title, genre) {
        this.title = title;
        this.genre = genre;
        this.similarMovies = [];  // Adjacency list (neighbors)
    }
}

// Data Structure to store movies
const movieGraph = {};

// Function to add movies to the graph
function addMovie(title, genre) {
    const newMovie = new Movie(title, genre);
    movieGraph[title] = newMovie;
}

// Function to connect two movies (create an edge between two nodes)
function addEdge(title1, title2) {
    const movie1 = movieGraph[title1];
    const movie2 = movieGraph[title2];
    if (movie1 && movie2) {
        movie1.similarMovies.push(movie2);
        movie2.similarMovies.push(movie1);  // Undirected edge
    }
}

// Sample movies and connections (expanded dataset)
addMovie("Inception", ["Action", "Sci-Fi"]);
addMovie("Interstellar", ["Adventure", "Sci-Fi"]);
addMovie("The Dark Knight", ["Action", "Crime"]);
addMovie("The Prestige", ["Drama", "Mystery"]);
addMovie("Memento", ["Mystery", "Thriller"]);
addMovie("Dunkirk", ["Action", "History"]);
addMovie("Avatar", ["Action", "Adventure", "Sci-Fi"]);
addMovie("Titanic", ["Drama", "Romance"]);
addMovie("The Matrix", ["Action", "Sci-Fi"]);
addMovie("John Wick", ["Action", "Thriller"]);
addMovie("Pulp Fiction", ["Crime", "Drama"]);
addMovie("Forrest Gump", ["Drama", "Romance"]);
addMovie("The Shawshank Redemption", ["Drama"]);
addMovie("The Godfather", ["Crime", "Drama"]);
addMovie("The Lord of the Rings: The Fellowship of the Ring", ["Adventure", "Fantasy"]);
addMovie("The Hobbit: An Unexpected Journey", ["Adventure", "Fantasy"]);
addMovie("Harry Potter and the Sorcerer's Stone", ["Adventure", "Fantasy"]);
addMovie("Pirates of the Caribbean: The Curse of the Black Pearl", ["Action", "Adventure", "Fantasy"]);
addMovie("Star Wars: Episode IV - A New Hope", ["Action", "Adventure", "Sci-Fi"]);
addMovie("Guardians of the Galaxy", ["Action", "Adventure", "Sci-Fi"]);
addMovie("Iron Man", ["Action", "Adventure", "Sci-Fi"]);
addMovie("The Avengers", ["Action", "Adventure", "Sci-Fi"]);
addMovie("Black Panther", ["Action", "Adventure", "Sci-Fi"]);
addMovie("Jurassic Park", ["Action", "Adventure", "Sci-Fi"]);

// Adding edges based on similarities (genres, directors, actors)
addEdge("Inception", "Interstellar");  // Same director (Christopher Nolan), Sci-Fi genre
addEdge("Inception", "The Dark Knight");  // Same director
addEdge("The Dark Knight", "The Prestige");  // Same director
addEdge("The Prestige", "Memento");  // Same director
addEdge("Memento", "Inception");  // Same director
addEdge("Dunkirk", "Inception");  // Same director
addEdge("Avatar", "Guardians of the Galaxy");  // Sci-Fi genre
addEdge("Avatar", "Star Wars: Episode IV - A New Hope");  // Sci-Fi genre
addEdge("Titanic", "Avatar");  // Same director (James Cameron)
addEdge("The Matrix", "Inception");  // Sci-Fi, Mind-bending themes
addEdge("John Wick", "The Matrix");  // Same actor (Keanu Reeves)
addEdge("Pulp Fiction", "The Godfather");  // Crime genre
addEdge("Forrest Gump", "The Shawshank Redemption");  // Drama genre
addEdge("The Shawshank Redemption", "The Godfather");  // Drama genre
addEdge("The Lord of the Rings: The Fellowship of the Ring", "The Hobbit: An Unexpected Journey");  // Same universe
addEdge("The Hobbit: An Unexpected Journey", "Harry Potter and the Sorcerer's Stone");  // Fantasy genre
addEdge("Harry Potter and the Sorcerer's Stone", "Pirates of the Caribbean: The Curse of the Black Pearl");  // Adventure genre
addEdge("Pirates of the Caribbean: The Curse of the Black Pearl", "Guardians of the Galaxy");  // Adventure genre
addEdge("Star Wars: Episode IV - A New Hope", "Guardians of the Galaxy");  // Sci-Fi, Space adventure
addEdge("Iron Man", "The Avengers");  // Same character
addEdge("Iron Man", "Guardians of the Galaxy");  // Marvel Universe
addEdge("The Avengers", "Black Panther");  // Marvel Universe
addEdge("Jurassic Park", "Avatar");  // Sci-Fi, groundbreaking visuals

// BFS function to find movie recommendations
function recommendMovies(startMovie, maxRecommendations = 5) {
    if (!movieGraph[startMovie]) {
        alert("Movie not found in the database.");
        return [];
    }

    const toVisit = [movieGraph[startMovie]];
    const visited = new Set([startMovie]);
    const recommendations = [];

    while (toVisit.length > 0 && recommendations.length < maxRecommendations) {
        const currentMovie = toVisit.shift();

        for (let neighbor of currentMovie.similarMovies) {
            if (!visited.has(neighbor.title)) {
                recommendations.push(neighbor.title);
                toVisit.push(neighbor);
                visited.add(neighbor.title);
            }
            if (recommendations.length === maxRecommendations) break;
        }
    }
    return recommendations;
}

// Handling button click to get recommendations
document.getElementById('recommendButton').addEventListener('click', () => {
    const movieInput = document.getElementById('movieInput').value.trim();
    const recommendations = recommendMovies(movieInput, 5);

    // Display recommendations in the UI
    const recommendationList = document.getElementById('recommendationList');
    recommendationList.innerHTML = '';  // Clear previous recommendations

    if (recommendations.length > 0) {
        recommendations.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = movie;
            recommendationList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "No recommendations found.";
        recommendationList.appendChild(listItem);
    }
});

// Populate movie titles for the datalist (auto-suggestions)
const movieTitlesDatalist = document.getElementById('movieTitles');
for (let movieTitle in movieGraph) {
    const optionElement = document.createElement('option');
    optionElement.value = movieTitle;
    movieTitlesDatalist.appendChild(optionElement);
}
