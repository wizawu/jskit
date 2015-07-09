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
            let {status, handler} = _requests[method][matched];
            let response = handler(_clone(json));
            setTimeout(() => {
                if (status >= 200 && status < 300 || status === 304) {
                    if (done) done(response);
                } else {
                    if (fail) fail({status: status});
                }
            }, 100);
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
                let response = JSON.parse(responseText);
                done(response);
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

mockxhr.mock = (method, url, handler, status) => {
    _requests[method][url] = {
        handler: handler || (() => ""),
        status: status || 200
    };
};

export default mockxhr;
