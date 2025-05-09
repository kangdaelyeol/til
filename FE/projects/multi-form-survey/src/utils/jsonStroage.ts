import fs from 'fs'
type Key = string | number

export default class JsonStorage<Data> {
    #values: Record<Key, Data> = {}

    constructor(private readonly filename: string) {
        this.load()
    }

    load() {
        try {
            const data = fs.readFileSync(this.filename, 'utf-8')
            this.#values = JSON.parse(data) ?? {}
        } catch (e) {
            console.error(e)
        }
    }

    save() {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.#values))
        } catch (e) {
            console.error(e)
        }
    }

    get(key: Key): Data | undefined {
        return this.#values[key]
    }

    set(key: Key, value: Data) {
        this.#values[key] = value
        this.save()
    }

    getAll() {
        return this.#values
    }
}
