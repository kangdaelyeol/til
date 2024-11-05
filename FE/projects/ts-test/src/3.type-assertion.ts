// Type Assertion - 타입 단언
// 단언 - 주저하지 아니하고 딱 잘라 말함

// Assertion Keyword - as
// Non-null assertion operator - !

// as 명시
const el = document.querySelector('body') as HTMLBodyElement
el.textContent = 'hellow'

// ! 명시
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
