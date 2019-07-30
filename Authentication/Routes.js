const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../Models/models');
const { authenticate } = require('../Authentication/Auth');
const secret = process.env.JWT_SECRET || 'testing';

module.exports = server => {
    server.post('/register');
    server.post('/login', login);
};

function register(req, res) {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 15);
    user.password = hash;

    Users.add(user)
        .then(done => {
            res.status(201).json(done);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };
    const options = {
        expiresIn: '20d'
    }
    return jwt.sign(payload, secret, options);
}

function login(req, res) {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome, ${user.username}!`,
                    token
                });
            } else {
                res.status(401).json({ message: "Invalid Credentials"});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
}