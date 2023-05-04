/**
 * Saves a single province to database
 */
module.exports = function(objectrepostiory) {
    return function(req, res, next) {
        if(req.body.name === 'undefined'
            || req.body.governor === 'undefined'
            || req.body.leftHanded === 'undefined'
            || req.body.wineProduced === 'undefined') {
            res.redirect('/Provinces');
        }
        let newProvince = new objectrepostiory.Province();
        newProvince.name = req.body.name;
        newProvince.leftHanded = req.body.leftHanded;
        newProvince.wineProduced = req.body.wineProduced;

        objectrepostiory.Governor.findOne({name: req.body.governor}, (err, governor) => {
            if(err || !governor) {
                next(err);
            }
            newProvince.governor = governor.name;
            newProvince.governorId = governor._id;

            newProvince.save((err) => {
                if(err){
                    return next(err);
                }
                return next();
            });
        });
    };
};