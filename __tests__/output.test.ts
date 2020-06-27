import * as os from 'os'
import * as output from '../src/output'

const input = new Map([
  ['env1', 'value1'],
  ['env2', 'value2']
])

describe('output', () => {
  beforeEach(() => {
    process.stdout.write = jest.fn()
  })

  it('logOutput can output log', () => {
    output.logOutput(input)
    assertWriteCalls([`env1: value1${os.EOL}`, `env2: value2${os.EOL}`])
  })

  it('envOutput can output env', () => {
    output.envOutput(input)
    assertWriteCalls([
      `::set-env name=env1,::value1${os.EOL}`,
      `::set-env name=env2,::value2${os.EOL}`
    ])
  })

  it('outputOutput can output output', () => {
    output.outputOutput(input)
    assertWriteCalls([
      `::set-output name=env1,::value1${os.EOL}`,
      `::set-output name=env2,::value2${os.EOL}`
    ])
  })
})

// Assert that process.stdout.write calls called only with the given arguments.
function assertWriteCalls(calls: string[]): void {
  expect(process.stdout.write).toHaveBeenCalledTimes(calls.length)

  for (let i = 0; i < calls.length; i++) {
    expect(process.stdout.write).toHaveBeenNthCalledWith(i + 1, calls[i])
  }
}
