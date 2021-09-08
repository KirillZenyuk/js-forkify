export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, publisher, image) {
        const like = {
            id,
            title,
            publisher,
            image
        };
        this.likes.push(like);
        localStorage.setItem('likes', JSON.stringify(this.likes));
        return like;
    }

    deleteLike(id) {
        this.likes.splice(this.likes.findIndex(el => el.id === id), 1);
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    readStorage() {
        const likes = JSON.parse(localStorage.getItem('likes'));
        if (likes) {
            this.likes = likes;
        }
    }
}
