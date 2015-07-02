function Ruut(routes) {
    routes = routes || {};
    return Ruut.check.bind(this, routes);
}

Ruut.search = function (routes, pathname) {
    if (pathname === "/") {
        return routes["?"] || null;
    }
};

Ruut.check = function (routes, pathname) {
    var found = Ruut.search(routes, pathname);
    if (typeof found === "function") {
        return found(pathname);
    }
    return found || null;
};

module.exports = Ruut;
