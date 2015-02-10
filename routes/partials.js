exports.entityRouter = function (req, res) {
    var name = req.params.name;
    res.render('partials/entities/' + name);
};

exports.usersRouter = function (req, res) {
    var name = req.params.name;
    res.render('partials/users/' + name);
};
