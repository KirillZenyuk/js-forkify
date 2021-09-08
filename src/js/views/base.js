export const DOMElements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    searchResultsPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likes: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const DOMElementsStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${DOMElementsStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${DOMElementsStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};
