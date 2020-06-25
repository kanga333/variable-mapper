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