// Interface
// 인덱스 가능 타입 - Index Signature(인덱스 시그니처)

// Array

interface Fruits {
    // index Signature - key value - indexing type control
    [item: number]: string
}

const fruitList: Fruits = ['apple', 'banana', 'cherry']

console.log(fruitList[1])

// Object

interface UserIndex {
    // index signature - key값의 별칭은 관습적으로 'key' 로 사용
    [key: string]: unknown
    name: string
    age: number
}

const userB: UserIndex = {
    name: 'rkdeofuf',
    age: 27,
}

// Index signature에 의해 접근 가능

userB['isValid'] = true

interface Payload {
    [key: string]: unknown
}

function logValues(payload: Payload) {
    for (const key in payload) {
        // index signature에 의해 string 값으로 indexing 가능
        console.log(payload[key])
    }
}
