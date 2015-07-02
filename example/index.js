// Dependencies
var Ruut = require("../lib");

// Constants
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
  , "ionicabizau/some-project"
];

// Create the router
var router = Ruut({
    // Route: /
    "?": function (route) {
        console.log("This is the home page.", route);
        return "This is the home page"
    }
  , ":user": ["user-profile", {
        ":project": {
            "build": "build"
          , "editor": [null, {
            }, "editor_file" ]
        }
    }]
  , "blog": {
        // Route: /blog
        "?": "Blog homepage"
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

// Output routes
ROUTES.forEach(function (c) {
    console.log(c, router(c));
});
