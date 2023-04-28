/**
 * Load all provinces that match searchterm from database
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        if(req.body.searchterm === 'undefined') {
            res.redirect('/');
        }
        let provinces = objectrepostiory.Province.find({
            'name': new RegExp(`.*${req.body.searchterm}.*`)
        }).then(err => {
            if(typeof err !== 'undefined') {
                console.log(err);
            }
            res.locals.provinces = provinces;
            return next();
        });
    };
};