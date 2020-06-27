import * as core from '@actions/core'

export function logOutput(input: Map<string, string>): void {
  for (const item of input.entries()) {
    core.info(`${item[0]}: ${item[1]}`)
  }
}

export function envOutput(input: Map<string, string>): void {
  for (const item of input.entries()) {
    core.exportVariable(item[0], item[1])
  }
}

export function outputOutput(input: Map<string, string>): void {
  for (const item of input.entries()) {
    core.setOutput(item[0], item[1])
  }
}
