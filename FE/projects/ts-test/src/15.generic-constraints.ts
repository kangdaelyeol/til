// Generic

// Interface, Constraints(제약 조건)

// Generic type에 기존 타입을 상속 받아(extends) 타입 제약 조건을 명시할 수 있음.

// 여러 타입을 상속하려면 Union(|) 연산자를 사용한다.

interface MyData<T extends string | [number, number] | number | boolean> {
    name: string
    value: T
}

const mData1: MyData<string> = {
    name: 'name',
    value: 'str',
}

const mData2: MyData<number> = {
    name: 'number',
    value: 1,
}

const mData3: MyData<boolean> = {
    name: 'boolena',
    value: false,
}

const mData4: MyData<[number, number]> = {
    name: 'tuple',
    value: [1, 2],
}
