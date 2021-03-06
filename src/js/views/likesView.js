import {DOMElements, limitRecipeTitle} from "./base";

export const toggleLikeBtn = isLiked => {
    const icon = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${icon}`);
};

export const toggleLikeMenu = numLikes => {
    DOMElements.likes.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markup =
        `
            <li>
                <a class="likes__link" href="#${like.id}">
                    <figure class="likes__fig">
                        <img src="${like.image}" alt="${like.title}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                        <p class="likes__author">${like.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    DOMElements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = id => {
    const like = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if (like) {
        like.parentElement.removeChild(like);
    }
}
