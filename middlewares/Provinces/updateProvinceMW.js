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
        return objectrepository.Governor.findOne({name: req.body.governor}, (err, governor) => {
            if(err || !governor) {
                return next(err);
            }
            return objectrepository.Province.updateOne({_id: req.params.id},
                {
                    name: req.body.name,
                    governor: governor.name,
                    _governorId: governor._id,
                    leftHanded: req.body.leftHanded,
                    wineProduced: req.body.wineProduced
                },
                { upsert: false },
                (err, docs) =>{
                    if(err) {
                            return next(err);
                    }
                    console.log(docs);
                    return next();
                }
            );
        })
    }
}