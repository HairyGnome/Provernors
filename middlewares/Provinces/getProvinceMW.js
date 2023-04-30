/**
 * Gets single province from database by id
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        return objectrepostiory.Province.findOne( { _id: req.params.id }, (err, province) => {
            if (err) {
                return next(err);
            }
            res.locals.province = province;
            return next();
        });
    };
};