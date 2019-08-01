const express = require('express');

const db = require('../Models/profileModel');

const profileRouter = express.Router();

profileRouter.post('/', (req, res) => {
    const { user_id, firstname, lastname, location, website, bio } = req.body;
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
                    res.status(201).json({message: `Profile ${id} has been added`});
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

profileRouter.get('/:id/budget', (req, res) => {
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
    const {firstname, lastname, location, website, bio} = req.body;

    if(!firstname || !bio) {
        res.status(400).json({errorMessage: "Please provide a project name and description"});
    }

    db
        .updateProfile(id, {firstname, lastname, location, website, bio})
        .then(profile => {
            if (profile === 0) {
                profile.status(404).send(`Profile with id ${id} does not exist`)
            } else {
                res.status(201).json(profile);
            }
        })
        .catch(err => {
            res.status(500).send(`Error finding ${id}`);
        });
});

profileRouter.delete('/:id', (req, res) => {
    const {id} = req.params;

    db
        .delProfile(id)
        .then(profile => {
            if(profile.length === 0) {
                res.status(404).json({message: `Profile with ID: ${id} does not exist`});
            }
            res.json({success: `Profile with ID: ${id} has been removed`});
        })
        .catch(err => {
            res.status(500).json({error: `Profile with ID: ${id} could not be removed`});
        });
});

module.exports = profileRouter;