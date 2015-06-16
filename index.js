const METHODS = ["GET", "POST", "PUT", "DELETE"];

let mockxhr = {};
let _mock = false;
let _requests = {};

METHODS.map(method => _requests[method] = {});

function _xhr(method, url, json, done, fail) {
    if (_mock) {
        let matched = url;
        // Allow regular expression
        if (!matched) {
            for (let k in _requests[method]) {
                if (url.search(k) >= 0) {
                    matched = k;
                    break;
                }
            }
        }
        if (matched) {
            let response = _requests[method][matched].handler(json);
            setTimeout(() => {
                done(response);
            }, 50);
            return true;
        }
    }

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let status = xhr.status;
            if (status >= 200 && status < 300 || status === 304) {
                let responseText = xhr.responseText;
                try {
                    let response = JSON.parse(responseText);
                    done(response);
                } catch (e) {
                    console.error(e);
                    done(responseText);
                }
            } else {
                fail(xhr);
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(json));
    return false;
}

METHODS.map(method => {
    module[method] = (url, json, done, fail) => {
        _xhr(method, url, json, done, fail);
    };
});

mockxhr.setMock = (flag => _mock = flag);

mockxhr.mockxhr = (method, url, handler) => {
    _requests[method][url] = { handler: handler };
};

export default mockxhr;
