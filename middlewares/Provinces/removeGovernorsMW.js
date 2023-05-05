/**
 * Updates the governor and _governorId attributes of all province documents where _governorId is the
 * deleted governor's id
 */
module.exports = function (objectrepository) {
    return function(req, res, next) {
        return objectrepository.Province.find( { _governorId: req.params.id }, (err, results) => {
           if(err) {
               return next(err);
           }
           console.log(results);
           let ids = [];
           results.forEach(function(province) {
               ids.push(province._id);
           });
           ids.forEach(function(id) {
               console.log(id);
               objectrepository.Province.updateMany( { _id:  id },
                   { governor: '',
                       _governorId: null },
                   (err, docs) => {
                       if(err) {
                           return next(err);
                       }
                       console.log(docs);
                   }
               );
           });
           return next();
        });
    }
}