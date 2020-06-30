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

abstract class Mapper {
  static schema = {
    type: 'object',
    additionalProperties: {
      type: 'object',
      additionalProperties: {type: 'string'}
    }
  }

  protected validate(input: object): void {
    const ajv = new Ajv()
    const valid = ajv.validate(Mapper.schema, input)
    if (!valid) throw new Error(`Validation failed: ${ajv.errorsText()}`)
  }

  abstract pairs: KeyVariablesPair[]
  match(key: string): KeyVariablesPair | undefined {
    for (const param of this.pairs) {
      const ok = param.match(key)
      if (ok) {
        return param
      }
    }
  }
}

export class JSONMapper extends Mapper {
  pairs: KeyVariablesPair[]

  constructor(rawJSON: string) {
    super()
    const parsed = JSON.parse(rawJSON)
    this.validate(parsed as object)

    const tmpPairs = new Array<KeyVariablesPair>()
    const minify = rawJSON.replace(/\s/g, '')
    for (const key in parsed) {
      //Gets the position of the input keys to keep their order.
      const idx = minify.indexOf(`"${key}":{`)
      if (idx === -1) {
        throw new Error(`Failed to get key index of ${key}`)
      }
      const values = new Map<string, string>()
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
}
