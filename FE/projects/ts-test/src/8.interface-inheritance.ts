// Interface
// 확장(상속) - extends / inheritance

interface UserP {
    name: string
    age: number
}

// extends keyword를 통한 interface 상속
interface UserC extends UserP {
    isValid: boolean
}

const user2 = {
    name: 'rkdeofuf',
    age: 27,
    isValid: false,
}

// interface Override

interface UserO {
    firstName: string
    middleName: string
}

interface UserO {
    middleName: string // 중복되는 값은 같은 값을 가져야 한다.
    lastName: string
}

const user3: UserO = {
    firstName: 'first',
    middleName: 'middle',
    lastName: 'last',
}
