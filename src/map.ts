class ParameterMap {
    key: string;
    value: { [key: string]: string; };

    constructor(key: string, value: { [key: string]: string; }) {
        this.key = key;
        this.value = value;
    }

    match(key: string): { [key: string]: string; } | null {
        //TODO: regex match
        if ( this.key == key) {
            return this.value
        }
        return null
    }
}