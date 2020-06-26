import * as core from '@actions/core'

export function logOutput(input: Map<string, string>): void {
  for (const key in input.keys()) {
    core.info(`${key}: ${input.get(key)}`)
  }
}
