/**
 * Renders values into template
 */
module.exports = function(objectrepostiory, viewName) {
    return function(req, res) {
        res.render(viewName, res.locals);
    };
};