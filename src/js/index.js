import { DOMElements, renderLoader, clearLoader } from "./views/base"
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView"
import * as recipeView from "./views/recipeView"
import * as listView from "./views/listView"
import * as likesView from "./views/likesView"

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(DOMElements.searchResults)

        try {
            await state.search.getResults();
            clearLoader();
            searchView.renderResults(state.search.recipes);
        } catch (e) {
            console.log(e);
        }
    }
};

const controlRecipe = async () => {
    const recipeId = window.location.hash.substr(1);

    if (recipeId) {
        recipeView.clearRecipe();
        renderLoader(DOMElements.recipe);

        if (state.search) {
            searchView.highlightSelected(recipeId);
        }

        state.recipe = new Recipe(recipeId);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(recipeId));
        } catch (e) {
            console.log(e);
        }
    }
};

const controlList = () => {
    if (!state.list) {
        state.list = new List();
    }

    state.recipe.info.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

const controlLike = () => {
    if (!state.likes) {
        state.likes = new Likes();
    }
    const currentId = state.recipe.id;

    if (!state.likes.isLiked(currentId)) {
        const like = state.likes.addLike(
            currentId,
            state.recipe.info.title,
            state.recipe.info.publisher,
            state.recipe.info.image_url
        );
        likesView.toggleLikeBtn(true);
        likesView.renderLike(like);
    } else {
        state.likes.deleteLike(currentId);
        likesView.toggleLikeBtn(false);
        likesView.deleteLike(currentId);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

const readList = () => {
    state.list = new List();
    state.list.readStorage();
    state.list.items.forEach(item => listView.renderItem(item));
};

const readLikes = () => {
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLike(like));
};

["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe));
window.addEventListener('load', () => {
    readList();
    readLikes();
});

DOMElements.searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    controlSearch();
});

DOMElements.searchResultsPages.addEventListener('click', evt => {
    const btn = evt.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});

DOMElements.recipe.addEventListener('click', evt => {
    if (evt.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.info.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateRecipe(state.recipe);
        }
    } else if (evt.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateRecipe(state.recipe);
    } else if (evt.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        controlList();
    } else if (evt.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});

DOMElements.shopping.addEventListener('click', evt => {
    const id = evt.target.closest('.shopping__item').dataset.itemid;
    if (evt.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (evt.target.matches('.shopping__count-value')) {
        state.list.updateCount(id, parseFloat(evt.target.value));
        console.log(state.list);
    }
});
