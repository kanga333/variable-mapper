import * as core from '@actions/core'
import {ParameterMapList} from './map'
import {exportLog} from './exporter'

function run(): void {
  try {
    const map: string = core.getInput('map')
    const key: string = core.getInput('key')

    const params = new ParameterMapList(map)
    const matched = params.match(key)
    if (!matched) {
      core.info(`No match for the ${key}`)
      return
    }
    core.info(`${key} matches condition ${matched.key}`)
    matched.export(exportLog)
    matched.export(core.setOutput)
    matched.export(core.exportVariable)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
