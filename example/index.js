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
  , "/ionicabizau/my-project/editor/edit/some/file.js"
];

// Create the router
var router = Ruut([
    function (route) {
        console.log("This is the home page.", route);
        return "This is the home page"
    }
  , {
       ":user": ["user-profile", {
            ":project": {
                "build": "build"
              , "editor": [null, {}, "editor_file" ]
            }
        }]
      , "blog": ["Blog homepage", {
            "page": {
                ":page": "Blog page"
            }
          , ":article": ["Blog article", {
                "comments": ["comments", {
                    ":id": "Current comment"
                }]
            }]
        }]
        // Route: /signup
      , "signup": "Sign up route"
      , "users": ["Users list", {
            ":user": "User profile"
        }]
    }
]);

// Output routes
ROUTES.forEach(function (c) {
    console.log(c, router(c));
});
