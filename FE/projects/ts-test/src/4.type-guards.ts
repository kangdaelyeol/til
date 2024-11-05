// Type Guards - 타입 가드
// 에러가 발생할 수 있는 상황을 코드 상에서 방어하는 기법

function logText(el: Element) {
    console.log(el.textContent)
}

const h1El = document.querySelector('h1')

// Type Guard - condition statement with instanceof operator
if (h1El instanceof HTMLHeadingElement) {
    logText(h1El)
}

// Type Guard - condition statement with typeof operator
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
