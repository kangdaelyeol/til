// Function Overloading

function addOverloading(a: string, b: string): string
function addOverloading(a: number, b: number): number

// 해당 any 타입 함수 구현부는 실제로 parameter로 아무 값이나 받는 의미가 아닌, 윗 부분에 정의한 overloading 구조를 적용시킨다는 의미.
function addOverloading(a: any, b: any) {
    return a + b
}

console.log(addOverloading(1, 1))

console.log(addOverloading('1', '1'))

// console.log(addOverloading('1', 1)) - Error
