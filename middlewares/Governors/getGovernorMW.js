/**
 * Gets single governor from database by id
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        if(req.params.id === 'undefined') {
            return res.redirect('/governors');
        }
        return objectrepostiory.Governor.findOne( { _id: req.params.id }, (err, governor) => {
            if (err) {
                return next(err);
            }
            res.locals.governor = governor;
            return next();
        });
    };
};