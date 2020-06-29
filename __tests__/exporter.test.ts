import * as os from 'os'
import * as exporter from '../src/exporter'

describe('exporter', () => {
  beforeEach(() => {
    process.stdout.write = jest.fn()
  })

  it('getExporters can get exporters', () => {
    let exporters = exporter.getExporters('log,env,output')
    expect(exporters.length).toBe(3)
  })

  it('exportLog can export log', () => {
    exporter.exportLog('key', 'value')
    assertWriteCalls([`export key: value${os.EOL}`])
  })
})

// Assert that process.stdout.write calls called only with the given arguments.
function assertWriteCalls(calls: string[]): void {
  expect(process.stdout.write).toHaveBeenCalledTimes(calls.length)

  for (let i = 0; i < calls.length; i++) {
    expect(process.stdout.write).toHaveBeenNthCalledWith(i + 1, calls[i])
  }
}
