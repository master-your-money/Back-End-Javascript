const db = require('../Data/dbConfig');
const helpers = require('../Models/helpers');

module.exports = {
    getBudget: function(id) {
      let query = db('budget');
  
      if (id) {
        return query
          .where('id', id)
          .first()
          .then(budget => helpers.budgetToBody(budget));
      }
  
      return query.then(budget => {
        return budget.map(budget => helpers.budgetToBody(budget));
      });
    },
    addBudget: function(budget) {
      return db('budget')
        .insert(budget)
        .then(([id]) => this.getBudget(id));
    },
    updateBudget: function(id, refresh) {
      return db('budget')
        .where('id', id)
        .update(refresh)
        .then(count => (count > 0 ? this.getBudget(id) : null));
    },
    delBudget: function(id) {
      return db('budget')
        .where('id', id)
        .del();
    },
  };