/*

function _xhr(resolve, reject, method, url, json, done, fail) {
    if (_mock) {
        var matched = url;
        // Allow regular expression; Match longer URL pattern at first;
        if (!_requests[method][url]) {
            matched = null;
            for (var k in _requests[method]){
                if (url.search(k) === 0) {
                    matched = k;
                    break;
                }
            }
        }

        if (matched) {
            var _requests$method$matched = _requests[method][matched];
            var status = _requests$method$matched.status;
            var handler = _requests$method$matched.handler;

            var response = handler(_clone(json));
            setTimeout(function () {
                if (status >= 200 && status < 300 || status === 304) {
                    // resolve Promise if mocked handler return a ok message;
                    resolve(response)
                    if (done) done(response);
                } else {
                    // otherwise, reject it;
                    reject({status})
                    if (fail) fail({ status: status });
                }
            }, 100);
            return true;
        }
        // if no mocked handler matched, reject the Promise as well;
        reject({status: 404, statusText: "Mock method not found"})
    }

    // Normal request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300 || status === 304) {
                var responseText = xhr.responseText;
                var response = null;
                try {
                    response = JSON.parse(responseText);
                } catch (_) {
                    response = responseText;
                }

                // Resolve the promise and use response as value for onFulfilled function;
                resolve(response)
                if (_success) {
                    _success(response, done, fail);
                } else if (done) {
                    done(response);
                }
            } else {
                if (_failure) {
                    _failure(xhr, fail, done);
                } else if (fail) {
                    fail(xhr);
                }
                // Reject the promise and use xhr as reason for onRejected function;
                reject(xhr)
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    Object.keys(_headers || {}).forEach(function (k) {
        xhr.setRequestHeader(k, _headers[k]);
    });
    xhr.send(json ? JSON.stringify(json) : "");
    return false;
}

METHODS.forEach(function (method) {
    mockxhr[method] = function (url, json, done, fail) {
        var _promise = new Promise(function(resolve, reject){
            _xhr(resolve, reject, method, url, json, done, fail);
        })
        return _promise;
    };
});


*/
