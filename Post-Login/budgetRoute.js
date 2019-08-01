const express = require('express');

const db = require('../Models/budgetModel');

const budgetRoute = express.Router();

budgetRoute.post('/', (req, res) => {
    const { profile_id, Income, Expenditure, Region } = req.body;
    if(!Income || !Region) {
        res.status(400).json({errorMessage: "Please provide an Income and Region"});
    } else {
        db
            .addBudget({
                profile_id,
                Income,
                Expenditure,
                Region
            })
            .then(budget => {
                    res.json(budget);
            })
            .catch(err => {
                console.log(err);
            });
    }   
});

budgetRoute.get('/', (req, res) => {
    db
        .getBudget()
        .then(budget => {
            res.json(budget);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error"});
        });
});

budgetRoute.put('/:id', (req, res) => {
    const {id} = req.params;
    const {Income, Expenditure, Region} = req.body;

    if(!Income || !Region) {
        res.status(400).json({errorMessage: "Please provide an Income and Region"});
    }

    db
        .updateBudget(id, {Income, Expenditure, Region})
        .then(budget => {
            if (budget === 0) {
                budget.status(404).send(`Budget with id ${id} does not exist`)
            } else {
                res.status(201).json(budget);
            }
        })
        .catch(err => {
            res.status(500).send(`Error finding ${id}`);
        });
});

budgetRoute.delete('/:id', (req, res) => {
    const {id} = req.params;

    db
        .delBudget(id)
        .then(budget => {
            if(budget.length === 0) {
                res.status(404).json({message: `The budget with ID: ${id} does not exist`});
            }
            res.json({success: `The budget with ID: ${id} has been removed`});
        })
        .catch(err => {
            res.status(500).json({error: `The budget with ID: ${id} could not be removed`});
        });
});

module.exports = budgetRoute;