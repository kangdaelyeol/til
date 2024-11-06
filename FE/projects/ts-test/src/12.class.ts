// Class

// 접근 제어자 - Access Modifiers: public, protected, private

class UserClass {
    // class Body 부분에 클래스 속성 타입에 대한 선언을 해주어야 한다.
    first: string = 'default' // default value 선언 가능
    protected last: string // 타입 정의 부분에 접근 제어자(access modifier) 적용 할 수 있음 - 기본값은 public이다.
    age: number

    constructor(first: string, last: string, age: number) {
        this.first = first
        this.last = last
        this.age = age
    }

    protected getAge() {
        return `${this.first} ${this.last} is ${this.age}`
    }
}

class UserClassC extends UserClass {
    getAge() {
        return `${this.first} ${this.last} is ${this.age}`
    }
}

const cUser = new UserClassC('rkd', 'eofuf', 27)

console.log(cUser.getAge())

// class body 에 타입의 정의하는 class 선언 방식은 복잡하므로 constructor에 축약형으로 클래스를 선언할 수 있다.

class UserShorthand {
    // 생성자 함수에 축약형으로 타입과 속성을 동시에 정의할 수 있다.
    // 이 경우 접근 제어자(access modifier)의 생략은 '불가능' 하다.
    constructor(
        public first: string = 'default',
        public last: string,
        public age?: number,
    ) {}
}
