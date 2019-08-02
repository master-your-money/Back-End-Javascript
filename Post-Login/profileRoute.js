const express = require('express');

const db = require('../Models/profileModel');

const profileRouter = express.Router();

profileRouter.post('/', (req, res) => {
    const {user_id, firstname, lastname, location, website, bio} = req.body;
    if(!firstname || !bio) {
        res.status(400).json({errorMessage: "Missing firstname or bio"});
    } else {
        db
            .addProfile({
                user_id,
                firstname,
                lastname,
                location,
                website,
                bio
            })
            .then(profile => {
                    res.json(profile);
            })
            .catch(err => {
                console.log(err);
            });
    }       
});

profileRouter.get('/', (req, res) => {
    db
        .getProfiles()
        .then(profile => {
            res.json(profile);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error"});
        });
});

profileRouter.get('/budget/:id', (req, res) => {
    const {id} = req.params;
    db
        .ProfilesWithBudgets(id)
        .then(budget => {
            res.json(budget);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error"});
        });
});

profileRouter.put('/:id', (req, res) => {
    const {id} = req.params;
    const {user_id, firstname, lastname, location, website, bio} = req.body;

    if(!firstname || !bio) {
        res.status(400).json({errorMessage: "Please provide a profile name and description"});
    }

    db
        .updateProfile(id, {user_id, firstname, lastname, location, website, bio})
        .then(profile => {
            res.json(profile);
        })
        .catch(err => {
            res.status(500).send(`There was an error from the database`);
        });
});

profileRouter.delete('/:id', (req, res) => {
    const {id} = req.params;

    db
        .delProfile(id)
        .then(profile => {
            res.json(profile);
        })
        .catch(err => {
            res.status(500).json({error: `Profile with ID: ${id} could not be removed`});
        });
});

module.exports = profileRouter;