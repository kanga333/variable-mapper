import {ExportFunc} from './exporter'
import Ajv from 'ajv'

class KeyVariablesPair {
  key: string
  variables: Map<string, string>
  idx: number

  constructor(key: string, variables: Map<string, string>, idx: number) {
    this.key = key
    this.variables = variables
    this.idx = idx
  }

  match(key: string): boolean {
    return Boolean(key.match(this.key))
  }

  export(fn: ExportFunc): void {
    for (const variable of this.variables.entries()) {
      fn(variable[0], variable[1])
    }
  }
}

const schema = {
  type: 'object',
  additionalProperties: {
    type: 'object',
    additionalProperties: {type: 'string'}
  }
}

export class JSONMapper {
  pairs: KeyVariablesPair[]

  constructor(rawJSON: string) {
    const tmpPairs = new Array<KeyVariablesPair>()
    const parsed = JSON.parse(rawJSON)
    const minify = rawJSON.replace(/\s/g, '')
    const ajv = new Ajv()
    const valid = ajv.validate(schema, parsed)
    if (!valid) throw new Error(`Validation failed ${ajv.errorsText()}`)
    for (const key in parsed) {
      const values = new Map<string, string>()
      const idx = minify.indexOf(`"${key}":{`)
      if (idx === -1) {
        throw new Error(`Failed to get key index of ${key}`)
      }
      for (const val in parsed[key]) {
        values.set(val, parsed[key][val])
      }
      const p = new KeyVariablesPair(key, values, idx)
      tmpPairs.push(p)
    }
    this.pairs = tmpPairs.sort(function(a, b) {
      return a.idx - b.idx
    })
  }

  match(key: string): KeyVariablesPair | undefined {
    for (const param of this.pairs) {
      const ok = param.match(key)
      if (ok) {
        return param
      }
    }
  }
}
