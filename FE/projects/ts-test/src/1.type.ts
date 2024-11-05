/* type 종류 */

let str: string
let red: string = 'red'

const fruits: string[] = ['apple', 'banana']

// union - vertical bar
const union: (string | number)[] = ['abc', 123, 'asc']

const unionVal: string | number | null = null

const obj: object = {}
const arr: object = []
const func: object = () => {}

interface User {
    name: string
    age: number
    isValid: boolean
}

const userA: User = {
    name: 'rkdeofuf',
    age: 22,
    isValid: true,
}

const add = (x: number, y: number): number => x + y

const a: number = add(1, 2)

const hello = (): void => {
    console.log('hello!')
}

const h: void = hello()

let ho: any = 'helo'
const uk: unknown = '123'

ho = {}
ho = []
ho = (x: number, y: number): number => x + y

// any는 사용하면 안되는 타입! - TS 사용 목적에 어긋남 => 데이터 타입을 확실히 정하지 못한 상황에서는 unknown 타입을 사용!
// let any: any = uk
// let boo: boolean[] = uk
// let stt: string[] = uk
// let ffc: (x: number, y: number) => number = uk
// const obbj: { x: string; y: number } = uk

const tuple: [string, number, boolean] = ['a', 1, false]

function test(msg: string): void {
    console.log('hello!')
}

// Never

const nev: [] = []

// nev.push(1)

// union

let u: string | number | boolean

u = 'str'
u = 123
u = false

// intersection

interface User {
    name: string
    age: number
}

interface Validation {
    isValid: boolean
}

const rkdeofuf: User & Validation = {
    name: 'n',
    age: 1,
    isValid: true,
}
