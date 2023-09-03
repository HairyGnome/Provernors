/**
 * Load all governors from database
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        let search = req.query.search;
        if(typeof search !== 'undefined' && search !== '') {
            return objectrepostiory.Governor.find({name: new RegExp(`.*${search}.*`)},
                (err, results) => {
                    if(err){
                        return next(err);
                    }
                    res.locals.governors = results
                    return next();
                });
        }
        return objectrepostiory.Governor.find({}, (err, results) => {
            if(err){
                return next(err);
            }
            res.locals.governors = results;
            return next();
        });
    };
};