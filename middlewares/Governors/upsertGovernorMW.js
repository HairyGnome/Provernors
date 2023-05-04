/**
 * Inserts governor with name to db, but only if governor with said name is not already in db
 */
module.exports = function(objectrepository) {
    return function(req, res, next) {
        return objectrepository.Governor.updateOne({name: req.body.governor}, {}, {upsert: true},
            (err) => {
                if(err) {
                    return next(err);
                }
                return next();
            }
        );
    }
}