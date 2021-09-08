import uniqid from 'uniqid'

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        localStorage.setItem('list', JSON.stringify(this.items));
        return item;
    }

    deleteItem(id) {
        this.items.splice(this.items.findIndex(el => el.id === id), 1);
        localStorage.setItem('list', JSON.stringify(this.items));
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }

    readStorage() {
        const items = JSON.parse(localStorage.getItem('list'));
        if (items) {
            this.items = items;
        }
    }
}
