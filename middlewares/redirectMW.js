/**
 * Redirects to page given as parameter
 */
module.exports = function(objectrepository, viewName) {
    return function(req, res) {
        res.redirect(viewName);
    }
}