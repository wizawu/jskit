# mockxhr [![](https://badge.fury.io/js/mockxhr.svg)](https://www.npmjs.com/package/mockxhr) [![](https://travis-ci.org/wizawu/mockxhr.svg)](https://travis-ci.org/wizawu/mockxhr)


Flyweight ajax and mock-ajax with zero dependency.

### Installation

```
npm install --save mockxhr
```

### API

See [index.d.ts](https://github.com/wizawu/mockxhr/blob/master/dist/index.d.ts)

### Usage

```js
mockxhr.GET("https://api.github.com/users/wizawu", {}, function(resp) {
    // normal ajax
    console.log(resp)
})

// start mocking
mockxhr.setMock(true)

mockxhr.mock("GET", "https://api.github.com/users/wizawu", function(req) {
    return { login: req.name }
})
mockxhr.GET("https://api.github.com/users/wizawu", { name: "a" }, function(resp) {
    // { "login": "a" }
    console.log(resp)
})

mockxhr.mock("GET", "/users/.*", function(req) {
    return { login: req.name }
})
mockxhr.GET("/users/wizawu", { name: "b" }, function(resp) {
    // { "login": "b" }
    console.log(resp)
})
```
