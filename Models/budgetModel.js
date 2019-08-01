const db = require('../Data/dbConfig');
const helpers = require('../Models/helpers');

module.exports = {
    getBudget,
    addBudget,
    updateBudget,
    delBudget,
};

function getBudget(id) {
    let query = db('budget');
    if(id) {
        return query
            .where('id', id)
            .first()
            .then(budget => helpers.budgetToBody(budget));
    }

    return query.then(budget => {
        return budget.map(bu => helpers.budgetToBody);
    });
}

function addBudget(budget) {
    return db('budget')
        .insert(budget)
        .then(([id]) => this.getBudget(id));
}

function updateBudget(id, refresh) {
    return db('budget')
        .where('id', id)
        .update(refresh)
        .then(i => (i > 0 ? this.getBudget(id) : null));
}

function delBudget (id) {
    return db('budget')
        .where('id', id)
        .del();
}