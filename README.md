mockxhr
===

### Installation

npm install --save mockxhr

### Usage


```
import mockxhr from "mockxhr";

mockxhr.get(
    "https://api.github.com/users/wizawu",
    {"secret": "123"},
    resp => console.log(resp)
);
// Object {login: "wizawu", id: 1676756, avatar_url: ...}

mockxhr.setMock(true);
mockxhr.mock(
    "GET",
    "https://api.github.com/users/wizawu",
    req => { return {"login": req.secret} }
);
mockxhr.get(
    "https://api.github.com/users/wizawu",
    {"secret": "123"},
    resp => console.log(resp)
);
// Object {login: "123"}
```
