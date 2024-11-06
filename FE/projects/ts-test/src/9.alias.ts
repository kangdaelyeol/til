// 타입 별칭(Alias)

type TypeA = string

// Alias with union
type TypeB = string | number | boolean

// obj | tuple type Alias
type UserType =
    | {
          name: string
          age: number
          isValid: boolean
      }
    | [string, number, boolean]

const userAliasA: UserType = {
    name: 'rkd',
    age: 27,
    isValid: true,
}

const userAliasB: UserType = ['rkd', 27, true]

function someFunc(param: TypeB): TypeA {
    switch (typeof param) {
        case 'string':
            return param
        case 'number':
            return param.toFixed(2)
        default:
            return 'boolean!'
    }
}

// Alias vs Interface

// 문법적 차이 -  Alias 정의는 assignment operator를 사용한다.
type TypeUser = {
    name: string
    age: number
}

interface InterfaceUser {
    name: string
    age: number
}

// Alias - Interface 의 기능간의 차이점은 없지만, 인터페이스 사용을 권장한다.
