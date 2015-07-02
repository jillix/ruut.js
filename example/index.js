var Routy = require("../lib");


var router = Routy({
    // Route: /
    "?": function (route) {
        // ...
        var stream = self.flow(self._config.routes["?"]);
        stream.write(null, route);
    }
  , "blog": {
        // Route: /blog
      , "?": "Blog homepage"
        // Route: /blog/page/3
      , "page": {
            ":page": "Blog page"
        }
        // Route: /blog/some-article-slug
      , ":article": {
            "?": "Blog article"
          , "comments": {
                "?": "comments"
              , ":id": "Current comment"
            }
        }
    }
    // Route: /signup
  , "signup": "Sign up route"
  , "users": {
        // Route: /users
        "?": "Users list"
        // Route: /users/adioo
      , ":user": "User profile"
    }
});

const ROUTES = [
    "/"
  , "/blog"
  , "/blog/page/10"
  , "/blog/some-article"
  , "/blog/some-article/comments"
  , "/blog/some-article/comments/my-comment"
  , "/signup"
  , "/users"
  , "/users/ionicabizau"
];

ROUTES.forEach(function (c) {
    console.log(c, router(c));
});
