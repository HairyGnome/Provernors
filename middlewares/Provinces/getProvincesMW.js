/**
 * Load all provinces from database
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        let provinces = objectrepostiory.Province.find({}).exec().then((results) => {
            res.locals.provinces = results;
            return next();
        });
    };
};