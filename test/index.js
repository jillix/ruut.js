// Dependencies
var Ruut = require("../lib")
  , Assert = require("assert")
  ;

// Create the ruut instance
var router = Ruut([
    function (route) {
        console.log("This is the home page.", route);
        return "This is the home page"
    }
  , {
       ":user": ["user-profile", {
            ":project": {
                "build": "build"
              , "editor": [null, {}, "file-editor" ]
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

it("should support home page and function", function (cb) {
    Assert.deepEqual(router("/"), {
        data: "This is the home page"
      , params: {}
    });
    cb();
});

it("should support one level routes", function (cb) {
    Assert.deepEqual(router("/blog"), {
        data: "Blog homepage"
      , params: {}
    });
    cb();
});

it("should support parameters", function (cb) {
    Assert.deepEqual(router("/blog/page/10"), {
        data: "Blog page"
      , params: { page: '10' }
    });
    cb();
});

it("should support two level parameters", function (cb) {
    Assert.deepEqual(router("/blog/some-article"), {
        data: "Blog article"
      , params: { article: "some-article" }
    });
    cb();
});

it("should support more parameters in the same url", function (cb) {
    Assert.deepEqual(router("/blog/some-article/comments/my-comment"), {
        data: "Current comment"
      , params: {
            article: "some-article"
          , id: "my-comment"
        }
    });
    cb();
});

it("should support endless routes", function (cb) {
    Assert.deepEqual(router("/ionicabizau/my-project/editor/edit/some/file.js"), {
        data: "file-editor"
      , params: {
            user: "ionicabizau"
          , project: "my-project"
        }
    });
    cb();
});

it("should return null if the endless route is not configured", function (cb) {
    Assert.equal(router("/users/ionicabizau/and-invalid-route"), null);
    cb();
});
