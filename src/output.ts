import * as core from '@actions/core'

export function logOutput(input: Map<string, string>): void {
  for (const item of input.entries()) {
    core.info(`${item[0]}: ${item[1]}`)
  }
}
