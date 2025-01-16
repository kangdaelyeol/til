# JS React Design Patterns

### Overview

- 좋은 코드는 후임 개발자에게 보내는 러브레터와도 같다!

## 디자인 패턴 소개

### 디자인 패턴의 역사

- 건축가인 알렉산더(Christopher Alexander)는 디자인 문제에 대한 경험을 통해 특정 디자인 구조를 반복해서 적용하면 최적의 효과를 얻을 수 있다는 사실을 깨닫는다.

- 알렉산더는 사라(Sara Ishikawa)와 머레이(Murray Silverstein) 두 건축가와 협력하여 패턴 언어를 탄생시켰다. 이는 1977년에 `<<A Parrern Language>>` 라는 논문으로 발표되어, 나중엔 책으로 출간된다.

- 1990년 무렵 SW 엔지니어들은 초보자들을 위한 디자인 패턴 문서에 알렉산더의 원칙을 담기 시작했다.

- GoF(Gang of four) 라고 불리는 Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides는 1995년의 `<<GoF의 디자인 패턴>>` 을 저술하며 디자인 패턴에 대한 개념을 발전시키는데 공헌한다.

### 패턴이란 무엇인가

- 패턴이란 소프트웨어 설계에서 반복되는 문제와 주제에 대해 적용할 수 있는 재사용 가능한 템플릿을 말한다.

#### 패턴의 특징과 이점

**검증되었다**

- 패턴은 이전 개발자들의 경험과 통찰의 산물이다. 흔히 접하는 특정 문제를 해결하기 위한 검증된 효과적인 접근 방식이다.

**알아보기 쉽다**

- 패턴은 정해진 구조와 공통 표현(vocavulary)을 사용하여 광범위한 문제에 대한 해결책을 제공한다.

**사소한 실수로 인해 생길 수 있는 큰 문제를 방지한다**

- 정해진 패턴을 사용해 코드를 작성함으로써 코드 구조에 대한 고려를 하지 않고 개발에 집중할 수 있다.

**종합적인 해결책을 제시한다**

- 애플리케이션의 형태와 언어에 상관없이 적용해 코드 구조를 개선할 수 있다

**코드의 반복을 피할 수 있다**

- 불필요한 코드의 반복(DRY)을 피할 수 있다.

## 패턴성 검증

### 프로토 패턴

- 프로토 패턴(proto-pattern)이란 검증 절차를 모두 통과하지 않은 새롭게 제안된 패턴을 말한다.

- 프로토 패턴은 패턴성 검증("pattern"-ity test)을 거치며 세 가지 법칙(the rule of three)의 충족 여부를 확인받음으로써 패턴이 될 수 있다.

### 패턴성 검증

- 패턴성 검증은 프로토 패턴이 패턴으로서의 역할을 충족할 수 있는지 판단하는 과정이다. 이 과정에서는 네 가지 측면을 중심으로 검증한다.

**문제 해결의 적합성**

- 설계된 디자인 패턴이 특정 문제를 해결하기 위해 사용되는데 적합한지를 확인한다.

**구조적 일치**

- 코드의 클래스, 객체간의 논리적 관계와 구조가 패턴의 구조와 일치하는지 검증한다.

**행동과 목적의 부합성**

- 프로토 패턴의 목적이 실제 의도한 목적과 부합하는지, 패턴의 행동이 올바르게 구현되었는지 검증한다.

**확장성과 재사용성**

- 코드가 패턴의 사용 목적을 충족하며, 확장성과 재사용성을 유지하는지 확인한다.

### 세 가지 법칙

- 좋은 패턴이 되기 위해서는 반복되는 현상, 또는 문제에서 지속적으로 사용되어야 한다. 반복성을 입증하기 위해 세 가지 법칙이라 불리는 질문에 대답할 수 있어야 한다.

**목적 적합성**

- 패턴은 명확한 목적(intent)을 가지고 있어야 하며, 특정 문제를 해결하려는 의도를 명확히 해야 한다.

**유용성**

- 패턴은 단순히 이론적인 해결책이 아니라, 현실적인 문제를 해결할 수 있는 실질적인 이점을 제공해야 한다.

**적용 가능성**

- 패턴은 보편적인 문제를 해결하기 위한 일반적인 구조를 제공해야 하며, 넓은 범위에 적용될 수 있어야 한다.

## 디자인 패턴의 유형

- 디자인 패턴은 모두 특정 객체 지향 설계의 문제나 이슈를 다룬다. 패턴간의 공통점을 기준으로 디자인 패턴의 유형을 구분할 수 있다.

**생성 패턴(Creational Pattern)**

- 생성 패턴은 주어진 상황에 적합한 객체를 생성하는 방법에 중점을 둔다. 기본적인 객체 생성 방식은 프로젝트의 복잡성을 증가시킬 가능성이 있기 때문에 이 과정을 제어하여 문제를 해결하는 것을 목표로 한다.

- 생성자(Constructor), 팩토리(Factory), 추상(Abstract), 프로토타입(Prototype), 싱글톤(Singleton), 빌더(Builder) 패턴이 생성 패턴에 속한다.

**구조 패턴(Structural Pattern)**

- 구조 패턴은 객체의 구성과 각 각체간의 관계를 인식하는 방법에 중점을 둔다. 시스템의 한 부분이 변경되어도 다른 곳에는 영향이 가지 않도록 도와주며 설계 목적에 맞지 않는 부분을 개선하는데 도움을 준다.

- 데코레이터(Decorator), 퍼사드(Facade), 플라이웨이트(Flyweight), 어뎁터(Adapter), 프록시(Proxy) 패턴이 구조 패턴에 속한다.

**행위 패턴(Behavioral Pattern)**

- 행위 패턴은 시스템 내의 객체간의 커뮤니케이션을 개선하거나 간소화 하는 방법에 중점을 둔다. 객체간의 공통적인 커뮤니케이션 패턴을 감지하고 책임을 분배함으로써 커뮤니케이션의 유연성을 높이고 객체의 행위를 추상화한다.

- 이터레이터(Iterator), 중재자(Mediator), 관찰자(Observer), 방문자(Visitor) 패턴이 행위 패턴에 속한다.

## 자바스크립트 디자인 패턴 - Creational Pattern

### 모듈 패턴

- 모듈 패턴은 클래스 기반 언어에서 **캡슐화** 구현하기 위해 고안된 개념이다.

- JS 환경에서 모듈 패턴은 클로저를 활용해 비공개 상태와 구성을 캡슐화 한다.

```js
// count 변수는 모듈 스코프 내에서만 접근 가능한 비공개 변수로서 작동한다.
let count = 0;

// count 자유변수는 testModule 클로저의 스코프에서 유효하다. 따라서 메서드를 통해서 참조가 가능하다.
const testModule = {
	increment() {
		return count++;
	},

	reset() {
		console.log(`count value prior to reset: ${count}`);
		count = 0;
	},
};

export default testModule;
```

#### 모듈에서 default로 공개하는 클로저를 namespace로써 사용이 가능하다.

```js
let privateVar = 0;

const privateMethod = (value) => {
	console.log(value);
};

// nameSpace 객체는 공개변수, 공개함수만이 정의되어 있고, 메서드를 통해 비공개 변수, 메서드에 접근할 수 있다.
// 즉 비공개 변수, 메서드는 모듈 스코프를 유효범위로 갖는 myNamespace 클로저 내부에서 보호된다.
const myNamespace = {
	publicVar: 'foo',

	publicFunc(value) {
		privateVar++;

		privateMethod(value);
	},
};

export default myNamespace;
```

- 모듈 패턴은 클로저를 통해 비공개 맴버를 쉽게 정의하고 관리할 수 있으며, 관련 기능을 한 객체에 모아두기 때문에 디버깅에서도 용이하다.

- 단점으로는 자동화 단위 테스트(unit test)에서 비공개 맴버는 접근이 어려워 테스트 범위가 제한되고, 오류를 고칠 때 복잡도를 높인다. 비공개 멤버를 고치기 위해서 해당 비공개 맴버를 사용하는 모든 공개 메서드를 보아야 하기 때문이다.

#### WeakMap을 사용하는 모듈 패턴

- class와 WeakMap을 활용한 모듈을 생성할 수 있다.

- WeakMap은 객체의 참조를 key로 사용하여 해당 객체가 가비지컬렉션 대상이 될 경우 자동으로 소멸되어 메모리 누수를 방지해준다.

```js
const basket = new WeakMap();
const privateMethod = new WeakMap();

class BasketModule {
	constructor() {
		// WeakMap은 객체를 key값으로 받는다. 생성자 함수에서 생성된 this 객체를 key 값으로 설정하여 비공개 맴버를 생성한다.

		basket.set(this, []);
		privateMethod.set(this, () => {
			// do something...
		});
	}

	// 공개 메서드를 정의하고, 공개 메서드에서 비공개 맴버를 참조하는 로직을 구현한다.

	doPublicMethod() {
		privateMethod.get(this)();
	}

	addItem(values) {
		const basketData = basket.get(this);
		basketData.push(values);
		basket.set(this, basketData);
	}

	getItemCount() {
		return basket.get(this).length;
	}

	getTotalPrice() {
		return basket.get(this).reduce((pre, item) => item.price + pre, 0);
	}
}
```

### 싱글톤 패턴

- 싱글톤(Singleton) 패턴은 클래스의 인스턴스가 오직 하나만 존재하도록 제한하는 패턴이다.

- 싱글톤 패턴은 전역에서 접근 및 공유해야 하는 단 하나의 객체가 필요할 때 사용된다.

- 싱글톤 패턴은 C++, Java와 같은 언어에서 **static** 키워드를 통해 생성하는 정적 클래스 인스턴스와 달리 객체 초기화 시점을 제어할 수 있다. 이는 객체를 초기화 할 때 필요한 정보가 아직 유효하지 않을 수 있기 때문이다.

  - 싱글톤은 C++같은 언어에서 지연된 실행(Lazy Loading)을 통해 개발자에게 제어권을 주어 동적 초기화 순서의 예측 불가능성을 제거하는 역할을 한다.

```js
// 모듈 스코프에 유효한 싱글톤 인스턴스 참조와 비공개 맴버를 생성한다.
let instance;

const privateMethod = () => {
	// do something...
};

const privateVariable = 'private';

const randomNumber = Math.random();

class MySingleton {
	constructor() {
		// 클래스 생성자는 암묵적으로 this를 반환하지만, 인스턴스 참조 변수를 반환하도록 설정하여 클래스 생성자 함수에서 공통된 참조를 반환하도록 한다.
		if (!instance) {
			// do something...
			instance = this;
		}

		// 항상 같은 인스턴스 참조를 반환하여 싱글톤을 보장한다.
		return instance;
	}

	publicMethod() {
		// do something...
	}

	getRandomNumber() {
		return randomNumber;
	}
}
```

- 싱글톤은 유용하지만 인스턴스를 생성하기 위해 클래스를 선언해야 하는 Java, C++ 언어와 달리 JS 환경에서는 객체 리터럴을 통해 바로 생성할 수 있다. 따라서 JS 환경에서 싱글톤이 필요하다는 것은 재설계를 고려해야 한다는 신호일 수도 있다.

### 프로토타입 패턴

- JS 환경의 모든 객체는 프로토타입 기반 상속을 구현한다.

- 프로토타입 패턴은 기존에 있는 객체를 복제해 만든 템플릿을 기반으로 새로운 객체를 생성하는 패턴이다.

- 프로토타입 상속과 클래스는 별개로 사용된다.

  - 프로토타입 상속은 클래스와 같은 설계도가 따로 정의되는 것이 아니라, **이미 존재하는** 다른 객체를 복제하여 새로운 객체를 생성하기 때문이다.

- 프로토타입 객체의 함수를 정의함으로써, 해당 프로토타입 객체를 상속 받은 객체는 프로토타입 객체의 메서드를 가리킨다.

  - 즉, 새로운 객체는 프로토타입 객체의 메서드 참조를 가지기 때문에 성능상으로도 이점을 챙길 수 있다(메서드 중복 정의 문제).

- JS 환경은 OOAD(Object-Oriented Analysis and Design - 객체 지향 분석 설계) 원칙을 따를 수 있도록 클래스 문법을 제공한다.

  - 하지만 클래스도 내부적으로 프로토타입으로 컴파일 되기 때문에 클래스 문법을 사용하더라도 프로토타입의 장점과 성능상의 이점을 모두 챙길 수 있다.

```js
// 템플릿으로써 활용할 객체를 생성한다.
const carProto = {
	name: 'default Name',
	productionYear: 2012,
	sayHello() {
		console.log(`${this.name}, ${this.productionYear}`);
	},
};

// Object.create 메서드를 통해 기존에 존재하는 객체를 템플릿(프로토타입)으로 하여 새로운 객체를 생성할 수 있다.
const myCar = Object.create(carProto, {
	name: {
		// 두 번째 인수에 프로퍼티 디스크립터(property descriptor)를 정의한다.
		value: 'korando',
		writable: true,
		enumerable: true,
		configurable: true,
	},
});

myCar.sayHello(); // 메서드는 프로토타입 객체에 정의되어 있고, 새로 생성된 객체는 그 참조를 가리킨다.
```

### 팩토리 패턴

- 팩토리 패턴은 객체 생성을 담당하는 **팩토리 객체** 를 생성하여 객체 생성 과정을 추상화 하는 패턴이다.

  - 즉, 객체 생성 로직을 별도의 팩토리 객체에 위임함으로써 클래스 생성자나 복잡한 설정 과정을 직접 드러내지 않도록 추상화 한다.

- 팩토리 패턴을 사용하는 것이 유용한 상황

  - 객체 생성 과정이 복잡할 때

  - 같은 속성을 공유하는 여러개의 작은 객체 또는 컴포넌트를 다뤄야 할 때

  - [duck typing](https://en.wikipedia.org/wiki/Duck_typing)과 같이, 특정 API 조건을 충족하는 다른 객체 인스턴스와 함께 인스턴스를 구성할 때

- 하지만 팩토리 패턴은 객체 생성 과정을 인터페이스(팩토리) 뒤로 추상화 하기 때문에 객체 생성 과정이 복잡할 경우 단위 테스트의 복잡성을 증가시킬 수 있다.

```js
class Car {
	constructor({ wheel = 4, name = 'myCar', doors = 4, color = 'silver' }) {
		this.wheel = wheel;
		this.name = name;
		this.doors = doors;
		this.color = color;
	}
}

class Truck {
	constructor({ wheelSize = 'large', name = 'myTruck', color = 'silver' }) {
		this.wheelSize = wheelSize;
		this.name = name;
		this.color = color;
	}
}

// 여러 타입의 객체를 생성 할 수 있는 팩토리 인터페이스를 선언한다.
// 객체의 생성 과정(constructor)은 팩토리 인터페이스 뒤로 추상화 한다.
class VehicleFactory {
	constructor() {
		this.vehicleClass = Car;
	}

	getVehicle({ vehicleType, ...attr }) {
		switch (vehicleType) {
			case 'car':
				this.vehicleClass = Car;
				break;
			case 'truck':
				this.vehicleClass = Truck;
				break;
			default:
				console.warn(`Unknown vehicle type: ${vehicleType}`);
		}

		return new this.vehicleClass(attr);
	}
}

const carFactory = new VehicleFactory();

const myCar = carFactory.getVehicle({
	wheel: 1,
	name: 'rkdeofuf',
});

const myTruck = carFactory.getVehicle({
	vehicleType: 'truck',
	wheelSize: 'sm',
});
```

#### 추상 팩토리 패턴

- 추상 팩토리 패턴은 같은 목표를 가진 각각의 팩토리들을 하나의 그룹으로 캡슐화 하는 패턴이다.

  - 즉, 여러 팩토리를 하나의 상위 인터페이스로 묶는 패턴이다.

```js
class AbstractVehicleFactory {
	constructor() {
		this.types = {};
	}

	registerVehicle(typeName, type) {
		// 공통된 목적을 충족하는 팩토리만 생성하기 위해 팩토리 생성 조건을 설정한다.
		const proto = type.prototype;
		if (!proto.drive) return;

		this.types[typeName] = type;
	}

	getVehicle(typeName, ...attr) {
		const type = this.types[typeName];
		return type ? new type(attr) : null;
	}
}

const vehicleFactory = new AbstractVehicleFactory();

// 클래스를 인수로 입력해 팩토리를 등록한다.
vehicleFactory.registerVehicle('car', Car);
vehicleFactory.registerVehicle('truck', Truck);

const myCar = vehicleFactory.getVehicle('car', {
	wheel: 1,
	name: 'rkdeofuf',
});

const myTruck = vehicleFactory.getVehicle('truck', {
	vehicleType: 'truck',
	wheelSize: 'sm',
});
```

## 자바스크립트 디자인 패턴 - Structural Pattern

### 퍼사드 패턴

- 퍼사드(Facade)란 실제 모습을 숨기고 꾸며낸 겉모습만을 세상에 드러내는 것을 말한다. 이러한 뜻에서 영감을 받아 퍼사드 패턴이라고 이름이 지어졌다.

- 퍼사드 패턴의 특징은 사용성이 높은 수준의 인터페이스를 제공하는것이다.

  - 즉, 코드의 **구현 부분과 사용 부분을 분리** 함으로써 인터페이스를 단순화 하며, 단순화된 인터페이스만 노출한다.

```js
// API 인터페이스 구현 부분
const _private = {
	num: 1,
	get() {
		return this.num;
	},
	set(value) {
		this.num = value;
	},
	run() {
		// do something...
	},
};

// 구현한 인터페이스의 사용을 추상화(facade) 함으로써 실제 퍼사드를 사용하는 부분의 코드를 간략히 하고, 사용성을 높인다.
const module = {
	facade({ value, run }) {
		_private.set(value);
		_private.get();
		if (run) {
			_private.run();
		}
	},
};

// 모듈 내부에선 구현된 동작이 수행되지만, 사용자는 내부에서 무슨 일이 벌어지는지 몰라도 된다.
module.facade({ value: 123, run: true });
```

- 퍼사드 패턴은 여러 동작을 추상화하는 레이어를 추가하기 때문에 시스템 자체가 단순한 경우 오히려 코드의 복잡성이 증가하고, 유지보수성이 떨어질 수 있다.
