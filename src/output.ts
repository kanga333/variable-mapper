import * as core from '@actions/core'

function logOutput(input: Map<string, string>): void {
    input.forEach((value, key) => {
        core.info(`${key}: ${value}`)
    })
}
