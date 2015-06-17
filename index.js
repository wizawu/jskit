const METHODS = ["GET", "POST", "PUT", "DELETE"];

let mockxhr = {};
let _mock = false;
let _requests = {};

METHODS.map(method => _requests[method] = {});

function _clone(json) {
    if (!json) return {};
    return JSON.parse(JSON.stringify(json));
}

function _xhr(method, url, json, done, fail) {
    if (_mock) {
        let matched = url;
        // Allow regular expression
        if (!_requests[method][url]) {
            matched = null;
            for (let k in _requests[method]) {
                if (url.search(k) >= 0) {
                    matched = k;
                    break;
                }
            }
        }
        if (matched) {
            let handler = _requests[method][matched].handler;
            let response = handler ? handler(_clone(json)) : undefined;
            setTimeout(() => {
                if (done) done(response);
            }, 50);
            return true;
        }
    }

    // Normal request
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let status = xhr.status;
            if (status >= 200 && status < 300 || status === 304) {
                if (!done) return;
                let responseText = xhr.responseText;
                try {
                    let response = JSON.parse(responseText);
                    done(response);
                } catch (e) {
                    console.error(e);
                    done(responseText);
                }
            } else {
                if (fail) fail(xhr);
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(json ? JSON.stringify(json) : "");
    return false;
}

METHODS.map(method => {
    mockxhr[method.toLowerCase()] = (url, json, done, fail) => {
        _xhr(method, url, json, done, fail);
    };
});

mockxhr.setMock = (flag => _mock = flag);

mockxhr.mock = (method, url, handler) => {
    _requests[method][url] = { handler: handler };
};

export default mockxhr;
