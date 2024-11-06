// 함수 - 명시적 this

interface Cat {
    name: string
    age: number
}

const cat: Cat = {
    name: 'cat',
    age: 1,
}

// 함수에 정의한 this parameter는 argument로써 받는 것이 아닌 함수 내부의 'this' 를 정의하는 문법이다.
// 즉 this param은 반드시 첫 번째 parameter에 정의되어야 한다.

function helloCat(this: Cat, message: string) {
    console.log(`hello ${this.name}, ${message}`)
}

helloCat.call(cat, 'message')
