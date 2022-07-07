const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({
                    message: 'User Already Registered'
                })
            }
            const {
                name,
                email,
                password,
                confirmPassword
            } = req.body;
            if (password === confirmPassword) {
                const _user = new User({
                    name,
                    email,
                    password
                })
                _user.save((error, data) => {
                    if (error) {
                        return res.status(500).json({
                            message: 'Something went wrong'
                        })
                    }
                    if (data) {
                        res.status(201).json({
                            message: 'User created successfully'
                        })
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Both passwords are not same" })
            }

        })
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(500).json({ error })
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, {
                        expiresIn: '1h'
                    })
                    const {
                        _id, name, email
                    } = user
                    res.status(200).json({
                        token,
                        user: {
                            _id, name, email
                        }
                    })
                }
                else {
                    return res.status(400).json({
                        message: 'Incorrect Password'
                    })
                }
            }
            else {
                return res.status(404).json({
                    message: 'User Not Found'
                })
            }
        })
}
