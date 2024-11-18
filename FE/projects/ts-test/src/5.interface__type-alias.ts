// Interface

// 선택적 속성(Optional) - ?
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

const eofuf2: MyUser = {
    name: 'rkeofuf2',
    age: 27,
    // isValid(Optional)
}

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

/*
 interface / type alias 공통적으로 타입을 정의하는 데 사용되는 키워드다. 
 interface는 보통 객체의 타입, 즉 프로퍼터, 메서드 구조를 정의할 때 사용된다.
 interface는 중복된 이름으로 선언이 가능하며, 중복 정의된 interface는 병합된다. 이를 선언 병합(Declaration Merging)이라고 한다.
 interface는 또한 extends 키워드를 사용해 확장이 가능하다.

 type alias는 interface처럼 중복 정의, 확장 할 수 없다.
 type alias는 generic, union, intersection 키워드르 사용해 다양한 타입을 정의할 수 있다.

 따라서 확장성을 고려한 객체 타입에 대해서 interface 키워드를 사용하고, 정적이지만 새로운 타입 정의에 대해선 type alias syntax를 사용한다.
*/
