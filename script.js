document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    const CatFoodCard = document.getElementById('catFood')
    const cardContainer = document.getElementById('card-container');

    // Mock data with 10 entries
    const cards = [
        { id: 1, title: "Cat Food", content: "Jennie’s Brand Cat Food", category: "cat", price: 30, img: "/Users/nancy/github/shopping_cart/cat.jpeg", exactMatch: false },
        { id: 2, title: "Dog Food", content: "Tom’s Brand Dog Food ", category: "dog", price: 28, img: "/Users/nancy/github/shopping_cart/dog.jpeg", exactMatch: false },
        { id: 3, title: "Probiotic Powder", content: "Improves your pet's digestion!", category: "both", price: 20, img: "/Users/nancy/github/shopping_cart/dog_cat.jpeg", exactMatch: false },
        { id: 4, title: "Collar:", content: "Small dog collar", category: "dog", price: 10, img: "/Users/nancy/github/shopping_cart/dog.jpeg", exactMatch: false },
        { id: 5, title: "Cat Tree", content: "5 foot tall cat tree", category: "cat", price: 105, img: "/Users/nancy/github/shopping_cart/cat.jpeg", exactMatch: false },
        { id: 6, title: "Ball", content: "red tennis ball", category: "dog", price: 7, img: "/Users/nancy/github/shopping_cart/dog.jpeg", exactMatch: false },
        { id: 7, title: "Pet Bed Small", content: "A bed for pets under 25 pounds", category: "both", price: 25, img: "/Users/nancy/github/shopping_cart/dog_cat.jpeg", exactMatch: false },
        { id: 8, title: "Pet Bed Large", content: "A bed for pets over 25 pounds", category: "both", price: 50, img: "/Users/nancy/github/shopping_cart/dog_cat.jpeg", exactMatch: true },
        { id: 9, title: "Pet Cage Small", content: "A cage for pets under 30 pounds", category: "both", price: 55, img: "/Users/nancy/github/shopping_cart/dog_cat.jpeg", exactMatch: false },
    ];

// });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase();
        const category = document.getElementById('category').value;
        const price = document.getElementById('price').value;
        const exactMatch = document.getElementById('exact-match').checked;
        const results = searchData(query, category, exactMatch);
        displayResults(results);
        grid(results);
    });

    function fullGrid() {
        grid(cards);
    }

    function searchData(query, category, exactMatch) {
        return cards.filter(item => {
            const matchesQuery = exactMatch
                ? (item.title.toLowerCase() === query || item.content.toLowerCase() === query)
                : (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));

            const matchesCategory = category === '' || item.category === category;

            const matchesExactMatch = !exactMatch || item.exactMatch;

            return matchesQuery && matchesCategory && matchesExactMatch;
        });
    }

    function grid(arr) {
        let cardGridHTML = '<div class="card-grid">';
        arr.forEach(function(card) {
            cardGridHTML += `
                <div class="card">
                    <div class="card-img"><img src="${card.img}" alt="${card.title}"></div>
                    <div class="card-title">${card.title}</div>
                    <div class="card-content">${card.content}</div>
                    <div class="card-price">$ ${card.price}</div>
                </div>
            `;
        });
        cardGridHTML += '</div>';
    
        // Set the innerHTML of the div to the grid of cards
        cardContainer.innerHTML = cardGridHTML;
    }


    function displayResults(results) {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No results found.</p>';
            return;
        }

        const resultList = document.createElement('ul');
        results.forEach(item => {
            const listItem = document.createElement('li');

            listItem.innerHTML = `
                <a href="#" class="result-link">
                    <h3>${item.title}</h3>
                    <p>${item.content}</p>
                    <small>Category: ${item.category} | Price: ${item.price} $</small>
                    <div>${item.cards}</div>
                    <span class="url">https://example.com/result/${item.id}</span>
                </a>
            `;
            resultList.appendChild(listItem);
            //resultList.appendChild(duplicateCard(item.cards));


        });

        resultsContainer.appendChild(resultList);
    }

});
