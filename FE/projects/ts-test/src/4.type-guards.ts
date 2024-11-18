// Type Guards - 타입 가드
/* 
  type guard 는 JS 런타임 환경에서 변수의 잘못된 타입 참조로 인한 에러를 방지하기 위한 기법이다. 이를 통해 타입 안정성을 확보 할 수 있다.
  ts 환경에서 typeof, instanceof, in 연산자로 직접 데이터 검사를 하거나 is 키워드를 사용하는 별도의 타입 체크 함수를 구현할 수 있다.
*/

function logText(el: Element) {
    console.log(el.textContent)
}

const h1El = document.querySelector('h1')

// Type Guard - conditional statement with instanceof operator
if (h1El instanceof HTMLHeadingElement) {
    logText(h1El)
}

// Type Guard - conditional statement with typeof operator
function logAdd(val: string | number | boolean | null) {
    let res = 'Result => '
    if (typeof val === 'number') {
        res += val.toFixed(2)
    }

    if (typeof val === 'string') {
        res += val.toUpperCase()
    }

    console.log(res)
}

// is keyword - type guard syntax
function isHTMLElement(el: Element | null): el is HTMLElement {
    return el instanceof HTMLElement
}
