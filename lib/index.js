const SEP = "/"
    , DYN = ":"
    ;

function Ruut(routes) {
    routes = routes || {};
    return Ruut.check.bind(this, routes);
}

Ruut.search = function (routes, pathname, params) {

    if (pathname === SEP) {
        if (routes["?"] === undefined) {
            return {
                is_valid: false
            };
        }
        return {
            is_valid: true
          , _: routes["?"]
          , params: params
        };
    }

    if (pathname.charAt(0) === SEP) {
        pathname = pathname.substr(1);
    }

    var nextIndex = pathname.indexOf(SEP)
      , cSplit = nextIndex !== -1 ? pathname.substr(0, nextIndex) : pathname
      , found = routes[cSplit]
      , dynamicField = null
      ;

    if (typeof found === "object") {
        if (nextIndex === -1) {
            return Ruut.search(found, SEP, params);
        }
        return Ruut.search(found, pathname.substr(nextIndex), params);
    }

    if (found !== undefined) {
        return {
            is_valid: true
          , _: found
          , params: params
        };
    }

    dynamicField = Object.keys(routes).filter(function (c) {
        return c.charAt(0) === DYN;
    })[0];

    if (dynamicField) {
        found = routes[dynamicField];
        params[dynamicField.substr(1)] = cSplit;
        if (typeof found === "object") {
            nextIndex = pathname.indexOf(SEP);
            if (nextIndex === -1) {
                return Ruut.search(found, SEP, params);
            }
            return Ruut.search(found, pathname.substr(nextIndex), params);
        }
        return {
            is_valid: true
          , _: found
          , params: params
        };
    }

    return {
        is_valid: false
    }
};

Ruut.check = function (routes, pathname) {
    var found = Ruut.search(routes, pathname, {});
    if (found.is_valid) {
        if (typeof found._ === "function") {
            return found._(found.params);
        }
        return {
            data: found._
          , params: found.params
        };
    }
    return null;
};

module.exports = Ruut;