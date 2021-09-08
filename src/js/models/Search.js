import axios from 'axios'

const API_SEARCH = 'https://forkify-api.herokuapp.com/api/search';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            this.recipes = (await axios(`${API_SEARCH}?q=${this.query}`)).data.recipes;
        } catch (e) {
            console.log(e);
        }
    }
}
