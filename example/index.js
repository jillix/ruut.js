// Dependencies
var Ruut = require("../lib");

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

console.log(router("/"));
// => { data: 'This is the home page', params: {} }

console.log(router("/blog"));
// => { data: 'Blog homepage', params: {} }

console.log(router("/blog/page/10"));
// => { data: 'Blog page', params: { page: '10' } }

console.log(router("/blog/some-article"));
// => { data: 'Blog article', params: { article: 'some-article' } }

console.log(router("/blog/some-article/comments"));
// => { data: 'comments', params: { article: 'some-article' } }

console.log(router("/blog/some-article/comments/my-comment"));
// => { data: 'Current comment', params: { article: 'some-article', id: 'my-comment' } }

console.log(router("/signup"));
// => { data: 'Sign up route', params: {} }

console.log(router("/users"));
// => { data: 'Users list', params: {} }

console.log(router("/users/ionicabizau"));
// => { data: 'User profile', params: { user: 'ionicabizau' } }

console.log(router("/ionicabizau/my-project/editor/edit/some/file.js"));
// => { data: 'editor_file', params: { user: 'ionicabizau', project: 'my-project' } }
