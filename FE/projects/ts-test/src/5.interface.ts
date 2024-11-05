// Interface

// 선택적 속성 - ?
// 읽기 전용 속성 - readonly

interface MyUser {
    name: string
    readonly age: number
    isValid?: boolean
}

const eofuf: MyUser = {
    name: 'rkdeofuf',
    age: 27,
    isValid: true,
}

// eofuf.age = 123 // error

const eofuf2: MyUser = {
    name: 'rkeofuf2',
    age: 27,
    // isValid(Optional)
}
