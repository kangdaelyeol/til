// Type Assertion - 타입 단언
// 단언 - 주저하지 아니하고 딱 잘라 말함

// Assertion Keyword - as
// Non-null assertion operator - !

/*
 type 단언(assertion)은 코드상 정확한 타입 추론이 어려운 경우 개발자의 직접적인 개입을 통한 타입 확정 개념이다.
 코드 상으로 타입 에러를 개발자가 단언함으로써 없애기 때문에 타입 안전성을 해친다.
 주로 as 키워드를 사용해 단언하고, null, undefined 값이 아님을 확정 짓기 위해 `non-null` 연산자로써 `!` 기호를 사용한다.

 객체 리터럴의 경우 satisfies 키워드를 이용해 타입 단언 전에 타입 체크를 함으로써 안정성 있는 타입 단언을 할 수도 있다.
*/

// as 명시
const el = document.querySelector('body') as HTMLBodyElement | null
el.textContent = 'hellow'

// ! (non-null operator) 명시
const el2 = document.querySelector('body')
el!.textContent = 'hello!'

// as 명시
function getNumber(x: number | null | undefined) {
    return Number((x as Number).toFixed(2))
}

// ! 명시
function getNumber2(x: number | null | undefined) {
    return Number(x!.toFixed(2))
}

getNumber(null) // 잘못된 방법

function getValue(x: string | number, isNumber: boolean) {
    if (isNumber) {
        return (x as Number).toFixed(2)
    }
    return (x as string).toUpperCase()
}

getValue(123, true)
getValue('abc', false)

// Assignment Assertion - 할당 단언

let numb!: number // ! 키워드 - 할당 했다고 단언 함으로써 nullable 에러 제거하기.
console.log(numb)

// satisfies keyword - object literal에 대한 타입 체크

interface PersonI {
    name: string
    age: number
}

const p1: PersonI = {
    name: 'rkdeofuf',
    age: 27,
} satisfies PersonI as PersonI // 객체 리터럴에 대한 타입 검사 (satisfies)
