const apiKey = '39fb5b5f432c429283fce2610b087e7c';

const blogContainer = document.getElementById('log-container'); // Updated to match HTML id
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim(); // Fixed to get input value
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear previous content
    articles.forEach((article) => { // Corrected the variable name
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        const img = document.createElement('img');
        img.src = article.urlToImage || 'https://placehold.co/600x400'; // Fallback image
        img.alt = article.title || 'No title available';

        const title = document.createElement('h2');
        const truncatedTitle = article.title && article.title.length > 30 
            ? article.title.slice(0, 30) + "..." 
            : article.title || 'No title available';
        title.textContent = truncatedTitle;

        const description = document.createElement('p');
        const truncatedDes = article.description && article.description.length > 120 
            ? article.description.slice(0, 120) + "..." 
            : article.description || 'No description available';
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });

        blogContainer.appendChild(blogCard);
    });
}

// Fetch random news on page load
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
