// 제네릭(Generic)

// Function

type Tup = [number, number]

function toArray<T>(a: T, b: T) {
    // generic type 사용
    return [a, b]
}

console.log(
    toArray('neo', 'anderson'),
    toArray(1, 2),

    // type inference 발생하지만, tuple 타입이 아닌 array 타입으로 인식 됨 => number[]
    toArray([1, 2], [1, 2, 3]),

    // 특수한 경우(tuple type을 의도한 경우) generic 타입을 명시해주어야 한다.
    toArray<Tup>([1, 2], [1, 2]),
)
