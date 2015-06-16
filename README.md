mockxhr
===

### Install

npm install --save mockxhr

### Usage

(TODO)

```
import mockxhr from "mockxhr";

mockxhr.get(
    "https://api.github.com/users/wizawu",
    {"secret": "123"},
    data => console.log(data)
);
// Object {login: "wizawu", id: 1676756, avatar_url: ...}

mockxhr.setMock(true);
mockxhr.mock(
    "GET",
    "https://api.github.com/users/wizawu",
    data => { return {"login": data.secret} }
);
mockxhr.get(
    "https://api.github.com/users/wizawu",
    {"secret": "123"},
    data => console.log(data)
);
// Object {login: "123"}
```
