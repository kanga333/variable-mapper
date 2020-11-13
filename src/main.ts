import * as core from '@actions/core'
import {JSONMapper} from './mapper'
import {getExporters} from './exporter'

function run(): void {
  try {
    const map: string = core.getInput('map')
    const key: string = core.getInput('key')
    const to: string = core.getInput('export_to')

    const params = new JSONMapper(map, 'first_match')
    const matched = params.match(key)
    if (!matched) {
      core.info(`No match for the ${key}`)
      return
    }
    core.info(`${key} matches regular expression ${matched.key}`)

    const exporters = getExporters(to)
    for (const exporter of exporters) {
      matched.export(exporter)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
