(function () {
// Constants
var SEP = "/"
  , DYN = ":"
  ;

/**
 * Ruut
 * Creates a new router.
 *
 * @name Ruut
 * @function
 * @param {Array|Object} routes An array or an object representing routes: If
 * it's an array, then the format is:
 *
 *  - `0` (Function|Non-null-values): If function, then it will be called and
 *    the data will be the returned value, otherwise the non-`null` value.
 *  - `1` (Array|Object): A route object/array (recursive definition).
 *  - `2` (Function|Non-null-values): This value/function is returned/called
 *    when no other routes were found.
 *
 * If the `routes` value is an object it should be in the following format:
 *
 * ```js
 * {
 *     // /some
 *     "some": {
 *         // /some/route
 *         "route": {
 *             // /some/route/with
 *             "with": {
 *                 // /some/route/with/anything-you-want
 *                 ":dynamic": {
 *                     // /some/route/with/anything-you-want/value
 *                     "value": function (params) {
 *                         return "This can be a function or a non-null value. The dynamic value is: " + params.dynamic;
 *                     }
 *                 }
 *             }
 *         }
 *     }
 * }
 * ```
 *
 * @return {Function} The `check` function getting the pathname as argument.
 */
function Ruut(routes) {
    routes = routes || {};
    return Ruut.check.bind(this, routes);
}

/**
 * search
 * Searches the pathname in the routes object, recursively. This is used internally.
 *
 * @name check
 * @function
 * @param {Routes} routes The routes to check the pathname in.
 * @param {String} pathname The pathname.
 * @return {Object} An object containing:
 *
 *  - `is_valid` (Boolean): `true` if the route was foud, `false` otherwise.
 *  - `_` (Function|Non-null-value): The route data.
 *  - `params` (Object): The dynamic parameters.
 */
Ruut.search = function (routes, pathname, params) {

    if (!Array.isArray(routes)) {
        routes = [null, routes, null];
    }

    if (pathname === SEP) {
        if (routes[0] === null) {
            return {
                is_valid: false
            };
        }
        return {
            is_valid: true
          , _: routes[0]
          , params: params
        };
    }

    if (pathname.charAt(0) === SEP) {
        pathname = pathname.substr(1);
    }

    var nextIndex = pathname.indexOf(SEP)
      , cSplit = nextIndex !== -1 ? pathname.substr(0, nextIndex) : pathname
      , found = routes[1][cSplit]
      , dynamicField = null
      , lastIndex = null
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

    dynamicField = Object.keys(routes[1]).filter(function (c) {
        return c.charAt(0) === DYN;
    })[0];

    if (dynamicField) {
        found = routes[1][dynamicField];
        params[dynamicField.substr(1)] = cSplit;
        if (typeof found === "object") {
            nextIndex = pathname.indexOf(SEP);
            if (nextIndex === -1) {
                return Ruut.search(found, SEP, params);
            }
            return Ruut.search(found, pathname.substr(nextIndex), params);
        }
        lastIndexOf = pathname.lastIndexOf(SEP);
        if (lastIndexOf === -1 || lastIndexOf === pathname.length - 1) {
            return {
                is_valid: true
              , _: found
              , params: params
            };
        }
    }

    if (routes[2]) {
        return {
            is_valid: true
          , _: routes[2]
          , params: params
        };
    }

    return {
        is_valid: false
    }
};

/**
 * check
 * Searches the pathname in the routes object and prepares the final object. This is used internally.
 *
 * @name check
 * @function
 * @param {Routes} routes The routes to check the pathname in.
 * @param {String} pathname The pathname.
 * @return {Object|null} The found route containing `data` and `params` fields or `null` otherwise.
 */
Ruut.check = function (routes, pathname) {
    var found = Ruut.search(routes, pathname, {});
    if (found.is_valid) {
        if (typeof found._ === "function") {
            return {
                data: found._(found.params)
              , params: found.params
            };
        }
        return {
            data: found._
          , params: found.params
        };
    }
    return null;
};

if (typeof module === "object") {
    module.exports = Ruut;
} else if (typeof window === "object") {
    window.Ruut = Ruut;
}

})();
