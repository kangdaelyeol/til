;[].constructor === Array

Object.prototype.toString.call(NaN).slice(8, -1)

const isEven = (num) => {
    return num % 2 === 0
}

const isOdd = (num) => {
    return num % 2 !== 0
}

// 부정 - Negation ! -> return boolean value

// 논리 - Logical

// 병합 - coalesce -> nullish coalescing

// 전개 - spread -> spread operator

const a = {
    x: 1,
    y: 2,
}

const b = {
    y: 3,
    z: 4,
}

const c = Object.assign({}, a, b)

const d = { ...a, ...b }

const arr = [1, 2, 3]

const sum3Args = (a, b, c) => {
    return a + b + c
}
sum3Args(...arr)

// 구조분해 - Destructing assignment

const [x, y, z] = arr

// - 괄호 앞에 semicolon

let x1 = 0
let x2 = 10
let x3 = 30

const arr2 = [1, 2, 3]

;[, , x3] = arr2
;[, , , , , , ,].length // 7

const ob1 = {
    aa: 1,
    bb: 2,
    cc: {
        qq: 1,
        ww: 3,
        ee: 5,
    },
    dd: 4,
    ee: 5,
}

const {
    aa,
    bb,
    cc: { qq: qb },
    ...objRest
} = ob1

// dissolve effect (rest)

const [a4, a5, ...rest] = [1, 5, , , , , , 2, 3, , , 3, , , 4, , 5, , 1, , 2]

// Optional chaining

const p1 = {
    age: 20,
    address: {
        city: 'city',
        region: 'jeju',
    },
}

const p2 = {
    age: 30,
    address: {
        school: 'sc',
    },
}

const getAddressCtiy = (person) => {
    return person.address?.city
}

const fruitList = {
    a: 1,
    b: 2,
    c: 3,
}

const itemList = [10, 20, 30]

// of - iterable => array
// in - key - object(not iterable, 배열에 사용하면 zero-based numbering loop)

// for (const key in fruitList)  console.log(key)

// for (const item of itemList) console.log(item)

// Parameter pattern

// 1. Default value

const sum = (a = 0, b = 0) => {}

sum(1, 2)

// 2. Destructing assignment

const p3 = {
    name: 'asd',
    age: 2,
    t: 123,
}

const getName = ({ t: dmdkfs = 0, ...rest }) => console.log(rest)

// getName(p3)

// 3. Rest parameter(spread operator) <-> argument(intuitive)

function sumPlus(...rest) {
    // return rest.reduce((acc, cur) => acc + cur, 0)
    return [...arguments].reduce((acc, cur) => acc + cur, 0)
}

// console.log(sumPlus(1, 2, 3, 4, 5, 3))

// IIFE - immediately invoked function expression
console.log(
    1 +
        -!!1 -
        !!-!-!-!!!+!+!+!!!+!!+!(function () {
            console.log('immediately-invoked function expression!')
            return 123
        })(),
)

// callback

const loadImage = (url, cb) => {
    const imgEl = document.createElement('img')
    imgEl.url = url
    imgEl.addEventListener('load', () => {
        cb(imgEl)
    })
}

url = 'abc.url'

loadImage(url, (imgEl) => {
    document.querySelector('.img-container').append(imgEl)
})

