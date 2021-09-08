import axios from 'axios'

const API_SEARCH = 'https://forkify-api.herokuapp.com/api/get'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            this.info = (await axios(`${API_SEARCH}?rId=${this.id}`)).data.recipe;
            this.info.time = this.info.ingredients.length * 5;
            this.info.servings = 4;
        } catch (e) {
            console.log(e);
        }
    }

    parseIngredients() {
        const unitsRaw = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const units = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'g', 'kg'];

        this.info.ingredients = this.info.ingredients.map(ingredient => {
            ingredient = ingredient.toLowerCase();
            unitsRaw.forEach((unitRaw, i) => {
                ingredient = ingredient.replace(unitRaw, units[i]);
            });

            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ').trim();

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => units.includes(el));

            let objIng;
            if (unitIndex > -1) {
                let count;
                const arrCount = arrIng.slice(0, unitIndex);
                if (arrCount.length === 1) {
                    count = eval(arrCount[0].replace('-', '+'));
                } else {
                    count = eval(arrCount.join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            } else if (parseInt(arrIng[0])) {
                objIng = {
                    count: parseInt(arrIng[0]),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIng;
        });
    }

    updateServings(type) {
        const newServings = type === 'dec' ? this.info.servings - 1 : this.info.servings + 1;
        this.info.ingredients.forEach(ingredient => {
            ingredient.count *= (newServings / this.info.servings);
        });
        this.info.servings = newServings;
    }
}
