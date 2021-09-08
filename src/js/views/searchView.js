import {DOMElements, limitRecipeTitle} from "./base";

const createButton = (page, type) =>
    `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
            <span>Page ${type === 'prev' ? page-1 : page+1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;

const renderPaginationButtons = (page, count, perPage) => {
    const pages = Math.ceil(count/perPage);

    let markup;
    if (page === 1 && pages > 1) {
        markup = createButton(page, 'next');
    } else if (page < pages){
        markup =
            `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}
            `;
    } else if (page === pages && pages > 1) {
        markup = createButton(page, 'prev');
    }

    DOMElements.searchResultsPages.insertAdjacentHTML("afterbegin", markup);
};

const renderRecipe = recipe => {
    const markup =
        `
            <li>
                <a class="results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    DOMElements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const getInput = () => DOMElements.searchInput.value;

export const clearInput = () => {
    DOMElements.searchInput.value = '';
};

export const renderResults = (recipes, page = 1, perPage = 10) => {
    const start = perPage * (page - 1);
    const end = perPage * page;
    recipes.slice(start, end).forEach(el => renderRecipe(el));

    renderPaginationButtons(page, recipes.length, perPage);
};

export const clearResults = () => {
    DOMElements.searchResultList.innerHTML = '';
    DOMElements.searchResultsPages.innerHTML = '';
};

export const highlightSelected = id => {
    Array.from(document.querySelectorAll('.results__link')).forEach(el => el.classList.remove('results__link--active'));
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};
