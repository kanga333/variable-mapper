import {ExportFunc} from './exporter'

class ParameterMap {
  key: string
  value: Map<string, string>
  idx: number

  constructor(key: string, value: Map<string, string>, idx: number) {
    this.key = key
    this.value = value
    this.idx = idx
  }

  match(key: string): boolean {
    return Boolean(key.match(this.key))
  }

  export(fn: ExportFunc): void {
    for (const entry of this.value.entries()) {
      fn(entry[0], entry[1])
    }
  }
}

export class ParameterMapList {
  prams: ParameterMap[]

  constructor(rawJSON: string) {
    const ps = new Array<ParameterMap>()
    const parsed = JSON.parse(rawJSON)
    const minify = rawJSON.replace(/\s/g, '')
    //TODO: validation
    for (const key in parsed) {
      const values = new Map<string, string>()
      const idx = minify.indexOf(`"${key}":{`)
      if (idx === -1) {
        throw new Error(`Failed to get key index of ${key}`)
      }
      for (const val in parsed[key]) {
        values.set(val, parsed[key][val])
      }
      const p = new ParameterMap(key, values, idx)
      ps.push(p)
    }
    this.prams = ps.sort(function(a, b) {
      return a.idx - b.idx
    })
  }

  match(key: string): ParameterMap | undefined {
    for (const param of this.prams) {
      const ok = param.match(key)
      if (ok) {
        return param
      }
    }
  }
}
