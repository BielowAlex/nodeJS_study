const {CustomError} = require("../errors");
const {userServices} = require("../services");
const {findByID} = require("../services/user_service");

module.exports = {
    checkUserOnCreate: (req, res, next) => {
        try {
            const {name = '', email = '', password = '', age} = req.body;


            if (!name || !email || !password) {
                return next(new CustomError('Some is field is missing.'));
            }

            if (password.length < 6) {
                return next(new CustomError('Password should include at least 5 symbols.'));
            }
            if (!age || !Number.isInteger(age) || age < 18) {
                return next(new CustomError('Age not valid.'));
            }
            if (!email.includes('@')) {
                return next(new CustomError('Email not valid.'))
            }

            next();
        } catch (e) {
            next(e)
        }
    },
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userServices.findByID(id);
            if (!user) {
                return next(new CustomError('User not found.'));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {name = '',age} = req.body;

            if (!name && !age) {
                return next(new CustomError('Some is field is missing.'));
            }

            if (!Number.isInteger(age) || age < 18) {
                return next(new CustomError('Age not valid.'));
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}