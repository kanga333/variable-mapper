class ParameterMap {
    key: string;
    value: Map<string, string>;

    constructor(key: string, value: Map<string, string>) {
        this.key = key;
        this.value = value;
    }

    match(key: string): Map<string, string> | null {
        //TODO: regex match
        if ( this.key == key) {
            return this.value
        }
        return null
    }
}

class ParameterMapList {
    prams: ParameterMap[];

    constructor(raw_json: string) {
        let ps = new Array<ParameterMap>()
        let parsed = JSON.parse(raw_json)
        //TODO: validation
        for (let key in parsed) {
            let values = new Map<string, string>()
            for (let val in parsed[key]) {
                values.set(val, parsed[key][val]);
            }
            let p = new ParameterMap(key, values)
            ps.push(p)
        }
        this.prams = ps
    }

    match(key: string): Map<string, string> | null {
        this.prams.forEach(param => {
            let matched = param.match(key)
            if ( matched instanceof Map) {
                return matched
            }
        })
        return null
    }
}
