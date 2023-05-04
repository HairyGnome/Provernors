/**
 * Load all provinces from database
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        let search = req.query.search;
        if(typeof search !== 'undefined' && search !== '')
        {
            return objectrepostiory.Province.find({name: new RegExp(`.*${search}.*`)},
                (err, results) => {
                if(err){
                    return next(err);
                }
                res.locals.provinces = results
                return next();
            });
        }
        return objectrepostiory.Province.find({}, (err, results) => {
            if(err){
                return next(err);
            }
            res.locals.provinces = results;
            return next();
        });
    };
};