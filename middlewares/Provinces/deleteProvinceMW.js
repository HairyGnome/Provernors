/**
 * Deletes a single province from database by id
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        if(req.params.id === 'undefined') {
            return res.redirect('/provinces');
        }
        objectrepostiory.Province.deleteOne({ _id: req.params.id }, function(err) {
            if (err) {
                return next(err);
            }
            return next();
        });
    };
};