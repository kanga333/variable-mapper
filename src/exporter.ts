import * as core from '@actions/core'

export interface ExportFunc {
  (name: string, val: string): void
}

export function exportLog(name: string, val: string): void {
  core.info(`export ${name}: ${val}`)
}
