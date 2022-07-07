const { check, validationResult } = require('express-validator');
exports.validateRegisterRequest = [
    check('name')
        .notEmpty()
        .withMessage('name is required'),
    check('email')
        .isEmail()
        .withMessage('Valid email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters long'),
    check('confirmPassword')
        .notEmpty()
        .withMessage('Confirm Password is required')
]

exports.validateLoginRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters long')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
}