/**
 * Load all provinces that match searchterm from database
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        if(req.body.searchterm === 'undefined' && req.body.searchterm === '') {
            res.redirect('/');
        }
        let provinces = objectrepostiory.Province.find({
            'name': new RegExp(`.*${req.body.searchterm}.*`)
        }).then(results => {
            res.locals.provinces = results;
            return next();
        });
    };
};