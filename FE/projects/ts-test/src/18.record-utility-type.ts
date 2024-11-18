// record utility type

/*
 Record Type은 동적인 객체 타입을 정의하기 위해 사용되는 Typescript의 내장 기능이다.
 Interface, Type alias 키워드를 통한 타입 정의는 정적인 타입이기 때문에 동적인 데이터 타입에 대해 적용하게 되면 동적인 데이터 활용을 할 수 없다.
 따라서 프로퍼티가 동적으로 변경되는 타입의 객체를 다룰 때 Record utility type을 사용할 수 있다.

 물론 Record utility type 키워드도 목적에 맞게 사용되지 않으면 타입 안정성을 해칠 수 있다.
*/

// Record utility type <K, V>
const dObj: Record<string, number | string | boolean> = {
    // Union type으로 여러 Type을 가질 수 있도록 했다.
    name: 'rkdeofuf',
    age: 27,
}

// 동적으로 프로퍼티 추가가 가능하다
dObj.isvalid = true
