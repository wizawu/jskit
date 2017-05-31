import { constructor as Chalk } from "chalk"

export interface Callback {
    (): void
}

interface Test {
    description: string
    callback: any
    duration?: number
    message?: string
}

interface Suite {
    description: string
    tests: Test[]
    before?: Callback
    after?: Callback
    beforeEach?: Callback
    afterEach?: Callback
}

const chalk = new Chalk({ enabled: true })
const suites: Suite[] = []

export function describe(description: string, callback: Callback) {
    suites.push({ description, tests: [] })
    callback()
    let suite = suites[suites.length - 1]
    if (suite.before) suite.before()
    suite.tests.forEach(test => {
        if (suite.beforeEach) suite.beforeEach()
        let start = Date.now()
        try {
            test.callback()
            test.duration = Date.now() - start
        } catch (ex) {
            test.message = ex.message
        }
        if (suite.afterEach) suite.afterEach()
    })
    if (suite.after) suite.after()
}

export const before = callback => suites[suites.length - 1].before = callback
export const after = callback => suites[suites.length - 1].after = callback
export const beforeEach = callback => suites[suites.length - 1].beforeEach = callback
export const afterEach = callback => suites[suites.length - 1].afterEach = callback

export function it(description: string, callback: Callback) {
    suites[suites.length - 1].tests.push({ description, callback })
}

export class report {
    private static tab1 = line => `  ${line}\n`
    private static tab2 = line => `    ${line}\n`

    static toString() {
        let result = "\n\n"
        let passing = 0, failing = 0
        let duration = 0
        suites.forEach(suite => {
            result += this.tab1(suite.description)
            suite.tests.forEach(test => {
                if (test.message === undefined) {
                    passing += 1
                    duration += test.duration as number
                    result += this.tab2(chalk.green("✓") + chalk.gray(` ${test.description} (${test.duration}ms)`))
                } else {
                    failing += 1
                    result += this.tab2(chalk.red(`${failing}) ${test.description}`))
                }
            })
            result += "\n"
        })
        result += "\n"
        result += this.tab1(chalk.green(`${passing} passing`) + chalk.gray(` (${duration}ms)`))
        result += this.tab1(chalk.red(`${failing} failing`))
        result += "\n"

        failing = 0
        suites.forEach(suite => {
            suite.tests.forEach(test => {
                if (test.message !== undefined) {
                    failing += 1
                    result += this.tab1(`${failing}) ${suite.description} ${test.description}:`)
                    result += "\n"
                    result += this.tab2(chalk.red(test.message))
                    result += "\n"
                }
            })
        })

        return result + "\n"
    }

    static ok() {
        return suites.every(suite => {
            return suite.tests.every(test => test.message === undefined)
        })
    }
}
