exports.welcome = function (req, res) {
    res.render("welcome", {
        user: req.user
    });
};

exports.home = function (req, res) {
    res.render("home", {
        id: 'Home',
        user: req.user
    });
};

exports.login = function (req, res) {
    res.render('login');
};

exports.register = function (req, res) {
    res.render('register');
};

exports.mariage = function (req, res) {
    res.render('mariage', {
        id: 'Home',
        user: req.user
    });
};