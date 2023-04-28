/**
 * Load all governors from database
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        let governors = objectrepostiory.Governor.find({}).exec().then((results, err) => {
           if(typeof err !== 'undefined') {
               console.log(err);
           }
           res.locals.governors = results;
           return next();
        });
    };
};