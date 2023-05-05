/**
 * Updates document with given id in db using req.body fields
 */
module.exports = function(objectrepository) {
    return function(req, res, next) {
        if(req.body.name === 'undefined'
            || req.body.governor === 'undefined'
            || req.body.leftHanded === 'undefined'
            || req.body.wineProduced === 'undefined'
            || req.params.id === 'undefined') {
            res.redirect('/provinces')
        }
        return objectrepository.Governor.updateOne({_id: req.params.id},
            { name: req.body.name,
                age: req.body.age,
                favouriteGladiator: req.body.favouriteGladiator,
                sandalSize: req.body.sandalSize},
            { upsert: false },
            (err, docs) =>{
                if(err) {
                    return next(err);
                }
                console.log(docs);
                return next();
            }
        );
    }
}