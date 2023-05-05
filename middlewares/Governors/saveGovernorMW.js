/**
 * Saves a single governor to database
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        if(req.body.name === 'undefined'
        || req.body.age === 'undefined'
        || req.body.favouriteGladiator === 'undefined'
        || req.body.sandalSize === 'undefined') {
            res.redirect('/governors');
        }
        let governor = new objectrepostiory.Governor();
        governor.name = req.body.name;
        governor.age = req.body.age;
        governor.favouriteGladiator = req.body.favouriteGladiator;
        governor.sandalSize = req.body.sandalSize;
        return governor.save((err) => {
            if(err) {
                return next(err);
            }
            return next();
        });
    };
};