const {Types} = require("mongoose");

const {CustomError} = require("../errors");

module.exports = {
    isValidID: (req, res, next) => {
        try {
            const {id} = req.params;
            console.log(id)

            // if (!Types.ObjectID.isValid(id)) {
            //    return next(new CustomError('Not valid id.'));
            // }

            next();
        } catch (e) {
            next(e);
        }
    }
}