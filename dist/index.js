"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var chalk = new chalk_1.constructor({ enabled: true });
var suites = [];
function describe(description, callback) {
    suites.push({ description: description, tests: [] });
    callback();
    var suite = suites[suites.length - 1];
    if (suite.before)
        suite.before();
    suite.tests.forEach(function (test) {
        if (suite.beforeEach)
            suite.beforeEach();
        var start = Date.now();
        try {
            test.callback();
            test.duration = Date.now() - start;
        }
        catch (ex) {
            test.message = ex.message;
        }
        if (suite.afterEach)
            suite.afterEach();
    });
    if (suite.after)
        suite.after();
}
exports.describe = describe;
function it(description, callback) {
    suites[suites.length - 1].tests.push({ description: description, callback: callback });
}
exports.it = it;
function before(callback) {
    suites[suites.length - 1].before = callback;
}
exports.before = before;
function after(callback) {
    suites[suites.length - 1].after = callback;
}
exports.after = after;
function beforeEach(callback) {
    suites[suites.length - 1].beforeEach = callback;
}
exports.beforeEach = beforeEach;
function afterEach(callback) {
    suites[suites.length - 1].afterEach = callback;
}
exports.afterEach = afterEach;
var report = (function () {
    function report() {
    }
    report.tab1 = function (line) {
        return "    " + line + "\n";
    };
    report.tab2 = function (line) {
        return "        " + line + "\n";
    };
    report.toString = function () {
        var _this = this;
        var result = "\n\n";
        var passing = 0, failing = 0;
        var duration = 0;
        suites.forEach(function (suite) {
            result += _this.tab1(suite.description);
            suite.tests.forEach(function (test) {
                if (test.message === undefined) {
                    passing += 1;
                    duration += test.duration;
                    result += _this.tab2(chalk.green("✓") + chalk.gray(" " + test.description + " (" + test.duration + "ms)"));
                }
                else {
                    failing += 1;
                    result += _this.tab2(chalk.red(failing + ") " + test.description));
                }
            });
            result += "\n";
        });
        result += "\n";
        result += this.tab1(chalk.green(passing + " passing") + chalk.gray(" (" + duration + "ms)"));
        result += this.tab1(chalk.red(failing + " failing"));
        result += "\n";
        failing = 0;
        suites.forEach(function (suite) {
            suite.tests.forEach(function (test) {
                if (test.message !== undefined) {
                    failing += 1;
                    result += _this.tab1(failing + ") " + suite.description + " " + test.description + ":");
                    result += "\n";
                    result += _this.tab2(chalk.red(test.message));
                    result += "\n";
                }
            });
        });
        result += "\n";
        return result;
    };
    report.ok = function () {
        return suites.every(function (suite) {
            return suite.tests.every(function (test) { return test.message === undefined; });
        });
    };
    return report;
}());
exports.report = report;
