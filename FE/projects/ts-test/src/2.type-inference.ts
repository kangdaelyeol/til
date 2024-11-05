// Type inference - 타입 추론

// 추론 - 어떠한 판단을 근거로 삼아 다른 판단을 이끌어 냄

// 1. 초기화된 변수

let num = 12

// 2. 기본값이 지정된 parameter
// 3. return value값이 확실한 function

function addNum(x: number, y = 2) {
    return x + y
}

// type inference 를 사용하는 것은 코드의 가독성을 높이는 효과가 있음

// type inference 로 인해 코드상으로 type을 명시하지 않았다는 것이라 해서 TS의 목적, 즉 코드의 안전성을 해치는 것이 아님.
