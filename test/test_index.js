const { deepStrictEqual } = require("assert")

const {
    describe,
    it,
    before,
    after,
    beforeEach,
    afterEach,
    report,
} = require("../dist/index")

describe("Suite A", () => {
    before(() => console.log("before A"))
    after(() => console.log("after A"))
    beforeEach(() => console.log("beforeEach A test"))
    afterEach(() => console.log("afterEach A test"))
    it("add", () => deepStrictEqual(1 + 1, 2))
    it("minus", () => deepStrictEqual(1 - 1, 2))
})

describe("Suite B", () => {
    before(() => console.log("before B"))
    after(() => console.log("after B"))
    beforeEach(() => console.log("beforeEach B test"))
    afterEach(() => console.log("afterEach B test"))
    it("add", () => deepStrictEqual(1 + 1, 2))
    it("minus", () => deepStrictEqual(1 - 1, 2))
})

deepStrictEqual(report.ok(), false)
console.log(report.toString())
