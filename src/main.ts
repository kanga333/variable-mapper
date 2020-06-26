import * as core from '@actions/core'
import {ParameterMapList} from './map'
import {logOutput} from './output'

function run(): void {
  try {
    const map: string = core.getInput('map')
    const key: string = core.getInput('key')

    const params = new ParameterMapList(map)
    const matched = params.match(key)
    if (matched.ok) {
      core.info(`No match for the ${key} key`)
      return
    }
    if (matched.value) {
      logOutput(matched.value)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
