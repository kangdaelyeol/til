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

### 믹스인 패턴

- 믹스인(Mixin)이란 기존 클래스(super class)에 특정 기능을 간단하게 **섞어 넣을 수 있도록(mix in)** 설계된 재사용 가능한 코드 구성을 말한다.

  - 즉, 하나의 클래스로부터 여러 기능을 상속받기 어렵거나 다양한 기능을 조합해 써야 할 때 믹스인 패턴은 유용하게 사용된다.

- JS 환경에서 클래스는 일급 객체로써 표현식으로 사용할 수 있으며 함수의 인수로 입력될 수 있다.

- 또한 extends 키워드에 클래스를 변수로써 입력받아 동적으로 상속이 가능하다. 이를 활용하여 믹스인 함수를 정의할 수 있다.

```js
// 핵심 로직을 담당하는 클래스(superclass)를 받아 부가적 기능을 상속후 반환하는 믹스인 함수를 정의한다.
const HelloMixin = (superclass) => {
	return class extends superclass {
		constructor(props) {
			super(props);

			this.name = props.name;
		}
		sayHello() {
			console.log('my name is:', this.name);
		}
	};
};

const ByeMixin = (superclass) => {
	return class extends superclass {
		sayBye() {
			console.log('bye!');
		}
	};
};

class Car {
	constructor(props) {
		const { wheel } = props;
		this.wheel = wheel;
	}
	moveUp() {
		// do something...
	}

	moveDown() {
		// do something
	}
}

// 믹스인 함수에 기존 핵심 클래스를 입력해 부가적 기능을 추가한 새로운 클래스를 선언한다.
class MyCar extends ByeMixin(HelloMixin(Car)) {}

const myCar = new MyCar({ name: 'eofuf', wheel: 4 });

myCar.sayHello();
myCar.sayBye();
```

- JS 환경에서 다중 상속을 지원하지 않지만, 믹스인 체이닝을 통해 여러 클래스(기능)을 섞어 새 클래스를 생성할 수 있다.

### 데코레이터 패턴

- 데코레이터(Decorator) 패턴은 동적 서브클래싱과 코드 재사용을 목표로 하는 패턴이다.

- 데코레이터는 핵심 도메인 로직이 구현된 기존 클래스에 동적으로 기능을 추가하기 위해 사용된다.

**데코레이터 패턴의 필요성**

- 기능 확장에 따라 다양한 객체 요구가 되면 각 객체에 해당하는 다양한 클래스를 설계하게 되는 현상이 발생한다.

  - 기능이 확장됨에 따라 생성해야 하는 클래스는 복리적으로 늘어날 수 있다. 이는 효율적이지 않기 때문에 객체 생성에 초점을 맞추지 않고, 기능 확장에 초점을 두는 것이다.

**JS 환경의 데코레이터 패턴**

- JS 환경에서 클래스 인스턴스에 직접적으로 새로운 메서드를 추가하면, 기존 인스턴스 구조에서 추가적인 기능을 더했기 때문에, 메서드를 데코레이터로써 추가했다고 해석할 수 있다.

  - 하지만 이러한 단순 구현으로 데코레이터의 이점을 챙길 수 없기 때문에, 데코레이터 클래스를 선언한다.

**데코레이터 패턴 구현**

- 가격(cost)과 화면 크기(screensize) 특징을 포함하는 맥북 클래스를 정의하고, 조건에 따라 메모리와 각인(engraving)을 할 수 있으며, 이에 따라 가격이 상승하는 로직 구현.

```js
class MacBook {
	constructor() {
		this.cost = 997;
		this.screenSize = 11.6;
	}

	getCost() {
		return this.cost;
	}

	getScreenSize() {
		return this.screenSize;
	}
}

// 베이스 클래스 인스턴스를 받아 기능을 확장하는 데코레이터 클래스 선언
// 기능을 확장할 핵심 클래스(MacBook)를 명시적으로 확장하고, 기존 클래스 메서드를 데코레이터로 오버라이드(override)한다.
class Memory extends MacBook {
	constructor(macBook) {
		super();
		this.macBook = macBook;
	}

	getCost() {
		// 주의할 점은 데코레이터가 상속받은 클래스의 메서드를 호출하는 것이 아닌, 생성자 함수에서 파라미터로 받은 인스턴스의 메서드를 호출하는 것이다.
		// 엄밀히 말하면 오버라이딩이라 볼 수 없고, 기존 반환값에 추가적으로 반환값을 더하는 재귀호출이라고 볼 수 있다.
		return this.macBook.getCost() + 75;
	}
}

class Engraving extends MacBook {
	constructor(macBook) {
		super();
		this.macBook = macBook;
	}

	getCost() {
		return this.macBook.getCost() + 200;
	}
}

let macBook = new MacBook();

// 기존 객체에 기능을 추가(decorate) 한다.
macBook = new Memory(macBook);

// 기존 객체에 기능을 추가(decorate) 한다.
macBook = new Engraving(macBook);

console.log(macBook.getCost()); // 1272 (997 + 75 + 200)
```

#### 추상 데코레이터

- 데코레이터 패턴에서 데코레이터 전용 인터페이스를 따로 정의하여, 이를 바탕으로 구체적 데코레이터들을 생성하는 변형 패턴이다.

**인터페이스를 사용하는 이유?**

- 인터페이스는 스스로의 문서 역할을 하고 재사용성을 높인다.

- 이론적으로 인터페이스의 변경사항이 객체의 구현에도 반영되게 하므로, 코드의 안정성과 일관성을 높여 준다.

**추상 데코레이터 패턴의 구성 요소**

- Component: 클래스 인터페이스

- Concrete Compoenent: 클래스 인터페이스의 구현체(실제 클래스)

- Decorator: 데코레이터 인터페이스, Component와 동일한 인터페이스를 제공하면서 내부적으로 Component를 참조한다.

- Concrete Decorator: 데코레이터 인터페이스의 구현체(데코레이터 클래스)

**추상 데코레이터 패턴 구현**

- 노트북(MacBook)의 기본사양에서 요청에 따라 부품을 업그레이드 할 수 있는 기능 구현

```js
// Component: JS 환경에는 인터페이스가 없기 때문에, 임의로 인터페이스 구현을 가정
const MacBookInterface = new Interface('MacBook', [
	'addEngraving',
	'addParallels',
	'add4GBRam',
	'add8GBRam',
	'addCase',
	'getPrice',
]);

// Concrete Component
class MacBook {
	// MacBook 구현
}

// Decorator - 추상 데코레이터 정의, JS 환경은 추상 클래스를 지원하지 않으므로 보일러플레이트 형식으로 정의
class MacBookDecorator {
	constructor(macBook) {
		// 입력받은 인스턴스가 인터페이스에 맞는지 확인하는 과정 추상화
		Interface.ensureImplements(macBook, MacBookInterface);
		this.macBook = macBook;
	}

	// 기본적으로 원본 객체에 메서드를 위임
	addEngraving() {
		return this.macBook.addEngraving();
	}

	addParallels() {
		return this.macBook.addParallels();
	}

	add4GBRam() {
		return this.macBook.add4GBRam();
	}

	add8GBRam() {
		return this.macBook.add8GBRam();
	}

	addCase() {
		return this.macBook.addCase();
	}

	getPrice() {
		return this.macBook.getPrice();
	}
}

// Concrete Decorator - 컴포넌트를 확장한 데코레이터 인터페이스를 구현.
// 기능을 부분적으로 확장한다.
class CaseDecorator extends MacBookDecorator {
	constructor(macBook) {
		super(macBook);
	}

	addCase() {
		return `${this.macBook.addCase()}Adding case to macbook`;
	}

	getPrice() {
		return this.macBook.getPrice() + 45;
	}
}
```

추상 데코레이터 패턴은 여러 데코레이터가 같은 인터페이스(추상 클래스)를 공유하므로, 코드 일관성과 확장성이 높다. 데코레이터를 체인으로 연결해도 구조가 단순해지고, 교체하거나 추가하기도 쉽다.

하지만 모든 데코레이터가 같은 인터페이스를 구현해야 하므로, 간단한 기능 확장시 번거로울 수 있다.

### 플라이웨이트 패턴

- 플라이웨이트(flyweight) 패턴은 객체 생성의 중복을 없애기 위해 나온 기법이며, 결과적으로 메모리 사용을 최적화 하기 위한 기법이다.

  - '플라이웨이트' 용어는 격투기에서 경량급(flyweight) 에서 유래했으며, 용어의 뜻 그대로 경량화에 초점을 맞추었다.

- 객체는 상태(state)를 갖는데, **공유할 수 있는 상태(intrinsic state)** 는 객체에 유지하고, **공유할 수 없는 상태(extrinsic state)** 는 객체 외부로 빼내어 **컨텍스트(context)** 헬퍼가 관리하여 필요할 때만 객체에 주입하도록 설계한다.

**플라이웨이트 패턴 구성 요소**

- Flyweight: 플라이웨이트 클래스 인터페이스

- Concrete Flyweight: 플라이웨이트 인터페이스 구현체(클래스)

- Extrinsic State Helper Context: 공유 불가능한 상태를 관리하는 헬퍼 객체

- Flyweight Factory: 플라이웨이트 객체를 생성하는 팩토리

**전통적인 플라이웨이트 패턴**

- 여러 종류의 커피를 주문할 수 있고, 주문 정보(커피의 맛(flavor), 테이블 번호)를 기반으로 커피를 제공(serve)하는 기능 구현

```js
// JS 환경은 객체를 동적으로 프로토타입 상속 구조로 만들어주는 메서드가 없기 때문에, 임의적으로 객체(Interface)를 상속받게 할 수 있는 로직을 구현한다.

// 책에서는 이러한 기법을 'duck punching' 이라 설명한다.
// - 하지만 'duck punching(monkey patching)' 기법은 기존의 기능(source)의 교체 없이 확장하는 기법이므로, 동적으로 새로운 프로토타입 상속구조를 형성하는 것은 duck punching 기법 특징에 맞지 않는다. 따라서 '동적 프로토타입 상속' 이라고 보는 것이 맞다.
class InterfaceImplementation {
	static implementsFor(superclassOrInterface) {
		if (superclassOrInterface instanceof Funciton) {
			this.prototype = Object.create(superclassOrInterface);
			this.prototype.constructor = this;
		} else {
			this.prototype = Object.create(superclassOrInterface);
			this.prototype.constructor = this;
		}
	}
}

// flyweight - 인터페이스를 객체로써 선언한다.
const CoffeeOrder = {
	serveCoffee(context) {},
	getFlavor() {},
};

// concrete flyweight - 인터페이스를 구현한 실제 플라이웨이트 클래스를 선언한다.
class CoffeeFlavor extends InterfaceImplementation {
	constructor(newFlavor) {
		super();
		// flavor 프로퍼티는 공유될 수 있는 고유의 상태(intrinsic state)이기 때문에 인스턴스의 프로퍼티로써 존재할 수 있다.
		this.flavor = newFlavor;
	}

	getFlavor() {
		return this.flavor;
	}

	// 공유 될 수 없는 고유의 상태(extrinsic)는 context로 캡슐화 되어 플라이웨이트 객체로 전달받아 기능을 수행한다.
	serveCoffee(context) {
		console.log(
			`Serving Coffee flavor ${this.flavor} to table ${context.getTable()}`
		);
	}
}

// Coffee Order 인터페이스 객체를 프로토타입으로써 상속 받는 구조를 형성한다.
CoffeeFlavor.implementsFor(CoffeeOrder);

// 공유될 수 없는 고유의 상태(extrinsic state)를 컨텍스트(context) 객체로 캡슐화하는 헬퍼를 정의한다.
const CoffeeOrderContext = (tableNumber) => ({
	getTable() {
		return tableNumber;
	},
});

// flyweight factory - 재사용 될 수 있는 플라이웨이트 객체를 생성하는 팩토리 클래스를 선언한다.
class CoffeeFlavorFactory {
	constructor() {
		this.flavors = {};
		this.length = 0;
	}

	// factory method - 특정 프로퍼티를 받아 해당 프로퍼티를 갖는 객체가 있으면 공유될 수 있는 객체이므로 같은 객체를 반환하는 로직을 형성한다.
	getCoffeeFlavor(flavorName) {
		let flavor = this.flavors[flavorName];
		if (!flavor) {
			flavor = new CoffeeFlavor(flavorName);
			this.flavors[flavorName] = flavor;
			this.length++;
		}
		return flavor;
	}

	getTotalCoffeeFlavorsMade() {
		return this.length;
	}
}

const testFlyWeight = () => {
	const flavors = [];
	const tables = [];
	let ordersMade = 0;
	const flavorFactory = new CoffeeFlavorFactory();

	const takeOrders = (flavorIn, table) => {
		// 만약 주문(takeOrders)이 많다면, 커피의 맛(flavor)은 한정되어 있고 해당 프로퍼티를 가진 객체는 공유될 수 있으므로, 같은 객체를 생성한다.
		flavors.push(flavorFactory.getCoffeeFlavor(flavorIn));

		// 테이블 번호는 공유 될 수 없는 고유의 속성이므로 따로 컨텍스트로써 관리된다.
		tables.push(CoffeeOrderContext(table));
		ordersMade++;
	};

	takeOrders('Cappuchino', 2);

	for (let i = 0; i < ordersMade; i++) {
		// flyweight객체는 공유될 수 없는 속성(extrinsic state)를 받아 고유의 동작을 수행한다.
		flavors[i].serveCoffee(tables[i]);
	}
};
```

#### 플라이웨이트 패턴을 사용한 도서 대출 관련 기능 구현

**플라이웨이트 최적화 이전**

- 대출 가능한 책의 클래스를 선언한다

```js
// 단 하나의 객체가 모든 상태를 관리
class Book {
	constructor(
		id,
		title,
		author,
		ISBN,
		availability,
		checkoutDate,
		checkoutMember,
		dueReturnDate
		// More attrs ...
	) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.ISBN = ISBN;
		this.availability = availability;
		this.checkoutDate = checkoutDate;
		this.checkoutMember = checkoutMember;
		this.dueReturnDate = dueReturnDate;
	}

	// Getter ...

	updateCheckoutStatus(
		id,
		newStatus,
		checkoutDate,
		checkoutMember,
		newReturnDate
	) {
		this.id = id;
		this.availability = newStatus;
		this.checkoutDate = checkoutDate;
		this.checkoutMember = checkoutMember;
		this.dueReturnDate = newReturnDate;
	}

	// Methods ...
}
```

- 상태와 메서드를 모두 포함하는 기본적인 클래스 형태는 단 하나의 클래스에 모든 로직이 정의되었기 때문에 코드의 의도를 파악하기 쉽다.

- 하지만 예외 상황(중복된 책이 여러 개 있는 경우)으로 인해 중복된 데이터가 여러 개 생성될 수 있다. 이는 메모리 사용에 비효율적이다.

**플라이웨이트 최적화 이후**

- 공유될 수 있는 내부 상태(intrinsic state)만을 포함하는 Book 클래스를 선언하고, 이를 생성하는 팩토리를 선언한다.

```js
// 공유되는 플라이웨이트 객체를 저장하는 객체는 싱글톤으로써 정의한다.
const existingBooks = {};

class Book {
	constructor(
		title,
		author,
		ISBN
		// More attrs ...
	) {
		this.title = title;
		this.author = author;
		this.ISBN = ISBN;
	}
}

class BookFactory {
	createBook({ title, author, ISBN }) {
		// ISBN 값은 책마다 고유하므로 책의 식별자(PK) 역할을 한다.
		// 같은 책에 대한 입력값은 같은 객체를 반환하도록 설계한다.
		let book = existingBooks[ISBN];
		if (!book) {
			existingBooks[ISBN] = new Book(title, author, ISBN);
			book = existingBooks[ISBN];
		}
		return book;
	}
}
```

- 대출 정보를 관리하는 매니저 클래스를 선언한다.

- 대출 정보를 저장하는 데이터베이스 객체도 싱글톤으로 관리되도록 한다.

```js
const bookRecordDatabase = {};

class BookRecordManager {
	addBookRecord({
		// 중복된 책에 대하여 구분하기 위한 고유한 식별자 id값을 할당한다.
		id,
		title,
		author,
		ISBN,
		checkoutDate,
		checkoutMember,
		dueReturnDate,
		availability,
	}) {
		const book = bookFactory.createBook({ title, author, ISBN });

		// 데이터베이스 정보에 외부 상태와 내부 상태를 저장한다.
		bookRecordDatabase[id] = {
			book,
			checkoutDate,
			checkoutMember,
			dueReturnDate,
			availability,
		};
	}

	// 변경할 수 있는 외부 상태에 대한 메서드를 정의한다.
	updateCheckoutStatus({ id, newStatus }) {
		const record = bookRecordDatabase[id];
		record.availability = newStatus;
	}
}
```

- 이러한 방식으로 중복되는 내부 상태만을 남기고, 고유 상태를 기반으로 데이터를 관리하는 구조를 설계할 수 있다.

- 플라이웨이트 패턴은 최종적으로 객체 구조의 복잡성을 더하게 되지만, 중복된 데이터가 많은 객체를 생성하게 되는 애플리케이션 구조의 경우 최적화를 통해 많은 이점을 얻을 수 있다.

#### 중앙 집중식 이벤트 핸들링

- DOM 이벤트 버블링을 활용하여 공통된 이벤트 핸들러를 상위 요소에 등록하고 하위 요소가 이를 공통 참조 함으로써 메모리 사용을 최적화 할 수 있다.

```html
<ul class="fruit-list">
	<li>apple</li>
	<li>banana</li>
	<li>tomato</li>
</ul>
<script>
	document.querySelector('.fruit-list').addEventListener('click', (e) => {
		if (e.target.tagName !== 'LI') return;

		const text = 'click';

		e.target.textContent += text;
	});
</script>
```

- ul 태그에 등록된 이벤트 핸들러는 하위 li 요소들에 의해 공통적으로 사용되므로, 이를 공유 객체인 flyweight 객체로 간주할 수 있다.

- 이벤트 핸들러에 포함된 데이터와 로직는 공유될 수 있는 데이터이자 로직이므로, 내부 상태(intrinsic state)로 간주할 수 있다. 즉, 여러 li 요소가 같은 이벤트 핸들러를 사용하기 때문이다.

- 이벤트 핸들러는 li 태그의 textContent를 사용하므로, 각 li 태그에 입력된 텍스트는 외부 상태(extrinsic state)이며, li 태그의 DOM 객체는 외부 상태를 캡슐화한 컨텍스트(Context)로 간주할 수 있다.

## 자바스크립트 디자인 패턴 - Behavioral Pattern

### 관찰자 패턴

- 관찰자(Observer) 패턴은 한 객체가 변경될 때 다른 객체들에게 변경되었음을 알릴 수 있게 해주는 패턴이다.

- 변경된 객체는 누가 자신을 구독하는지 알 필요 없이 모든 구독자에게 알림을 보낼 수 있다.

**관찰자 패턴 구성 요소**

- 주체(Subject): 관찰자 리스트(Observer list) 관리에 관한 기능을 제공하는 인터페이스

- 관찰자(Observer): 주체의 상태 변화 알림을 감지하는 기능을 제공하는 인터페이스

- 구체적 주쳬(Concrete Subject): 주체(Subject) 인터페이스를 구현한 클래스. 관찰자를 저장하고 목적에 맞게 관찰자들에게 알림을 전달하는 인터페이스를 구현.

- 구체적 관찰자(Concrete Observer): 관찰자(Observer) 인터페이스를 구현한 클래스. 주체의 상태 변화와 관찰자의 상태 변화를 일치하는 인터페이스를 구현.

**전통적인 관찰자 패턴**

- 버튼 요소를 클릭하면 컨테이너에 관찰자(Concrete Observer) 체크박스가 추가되며, 각 요소들은 주체(Concrete Subject) 체크박스의 상태 변경을 감지해 값을 동기화 하는 기능 구현.

```js
// 주체(Subject)가 포함할 관찰자 리스트를 클래스로 추상화
// 관찰자 리스트 클래스는 리스트에 관리에 대한 행동(method)을 포함
class ObserverList {
	constructor() {
		this.observerList = [];
	}

	add(obj) {
		return this.observerList.push(obj);
	}

	count() {
		return this.observerList.length;
	}

	get(index) {
		if (index < 0 || index >= this.observerList.length) {
			return;
		}

		return this.observerList[index];
	}

	indexOf(obj, startIndex) {
		let i = startIndex;

		while (i < this.observerList.length) {
			if (this.observerList[i] === obj) {
				return i;
			}
			i++;
		}
		return -1;
	}

	removeAt(index) {
		this.observerList.splice(index, 1);
	}
}

// 주체(Subject) - 관찰자 목록을 추가, 제거하고 알리는 기본적인 기능을 제공하는 인터페이스
class Subject {
	constructor() {
		this.observerList = new ObserverList();
	}

	addObserver(observer) {
		this.observerList.add(observer);
	}

	removeObserver(observer) {
		this.observerList.removeAt(this.observerList.indexOf(observer, 0));
	}

	notify(context) {
		const observerCount = this.observerList.count();
		for (let i = 0; i < observerCount; i++) {
			this.observerList.get(i).update(context);
		}
	}
}

// 구체적 주체(Concrete Subject) - 주체 역할을 하는 요소를 캡슐화하며, 상태 변화에 관한 조건을 정의
class ConcreteSubject extends Subject {
	constructor(element) {
		super();
		this.element = element;

		// 상태 변화를 일으키는 조건을 주체 자신의 상태값이 변경되는 사건으로 정의하며, 이에 따라 관찰자(Observer)에게 알림(notify) 전송
		this.element.addEventListener('change', () => {
			this.notify(this.element.checked);
		});
	}
}

// 관찰자(Observer) - 자신의 상태를 변화하는 기능을 포함하는 인터페이스
class Observer {
	constructor() {}
	update() {}
}

// 구체적 관찰자(Concrete Observer) - 관찰자 역할을 하는 요소를 캡슐화하며, 상태 변화를 감지하고, 주체의 상태 변화에 따른 자신의 상태 변화(update)를 구체화
class ConcreteObserver extends Observer {
	constructor(element) {
		super();
		this.element = element;
	}

	// 관찰자의 변화될 수 있는 상태를 요소의 체크 상태(element.checked) 프로퍼티로 정의.
	update(value) {
		this.element.checked = value;
	}
}

const addBtn = document.querySelector('.btn');
const container = document.querySelector('.btn-container');

// 요소를 구제척 주체(Concrete Subject)로 캡슐화
const checkBox = new ConcreteSubject(document.querySelector('.check-box'));

addBtn.addEventListener('click', () => {
	const newCheckBox = document.createElement('input');
	newCheckBox.type = 'checkbox';

	// 새로 생성되는 요소를 구체적 관찰자(Concrete Observer)로 캡슐화
	const observer = new ConcreteObserver(newCheckBox);

	checkBox.addObserver(observer);

	container.append(newCheckBox);
});
```

### 발행/구독 패턴

- 실제 JS 환경에서는 관찰자(Observer) 패턴의 변형인 발행/구독(Publish/Subscribe) 패턴이 더 널리 사용된다.

- 이는 JS 환경 특성상 이벤트 기반의 로직인 발행자(publisher)와 구독자(subscriber) 객체가 느슨하게 연결되는 구조가 자주 쓰이기 때문이다.

**발행/구독 패턴 특징**

- 발행/구독 패턴에서는 발행자와 구독자 사이 토픽/이벤트 채널(Topic/Event Channel)을 두어 발행자와 구독자가 서로 직접 참조하지 않아도 되도록 느슨한 결합(loose coupling)을 유지한다.

- 객체(발행자)는 다른 구독자의 메서드를 직접 호출하는 대신, 특정 토픽에 메시지(이벤트)를 발행하고, 특정 토픽(topic)을 구독하고 있는 구독자들은 이벤트가 발생했을 때 알림을 받아 콜백을 실행한다.

- 이로써, 발행자와 구독자의 관계가 독립적으로 유지되어, 서로의 내부 구조나 메서드를 알 필요가 없다.

**발행/구독 패턴 구현**

- 메시지 로깅과 관련된 기능을 구독(subscribe)하여 토픽/이벤트 채널에 등록하고, 이벤트 발행(publish)시 메시지를 로그로 출력하는 기능 구현

```js
// Topic/Event Channel 클래스 구현
class PubSub {
	constructor() {
		this.topics = {};

		this.subscriptionUID = 0;
	}

	// publish - 지정된 topic에 대한 구독자의(subscribe) 메서드를 호출한다.
	publish(topic, ...args) {
		const subscriberList = this.topics[topic];

		if (!subscriberList) return;

		subscriberList.forEach((sub) => sub.func(topic, ...args));
	}

	// subscribe - 입력된 topic에 대한 콜백 함수를 등록하여 구독한다.
	subscribe(topic, cb) {
		if (!this.topics[topic]) this.topics[topic] = [];

		this.topics[topic].push({
			func: cb,
			token: ++this.subscriptionUID,
		});

		return this.subscriptionUID;
	}

	// unsubscribe - 구독시 발행된 토큰을 입력하여 구독 정보를 삭제한다.
	unsubscribe(token) {
		for (const topic in this.topics) {
			this.topics[topic] = this.topics[topic].filter(
				(sub) => sub.token !== token
			);
		}
	}
}

const pubsub = new PubSub();

const messageLogger = (topic, data) => {
	console.log(`${topic} : ${data}`);
};

const subscription1 = pubsub.subscribe('message', messageLogger);

pubsub.publish('message', 'message1');

pubsub.unsubscribe(subscription1);

pubsub.publish('message', 'message2'); // 출력 x
```

**발행/구독 패턴 단점**

- 발행/구독 패턴에서는 발행자와 구독자의 연결을 분리한다. 따라서 특정 부분들이 기대하고 있는데로 동작하고 있다는 것을 보장하기 어려워질 수 있다.

- 발행자는 구독자의 의존 정보를 모르고, 또한 구독자는 다른 구독자의 존재를 모르기 때문에 실행 흐름을 파악하려 할 때 이벤트 소비 순서와 의존 관계에 대한 추적이 어렵다.

- 구독자와 발행자 사이의 관계가 동적으로 결정되기 때문에 시스템이 커질수록 구독자 / 발행자의 의존 관계를 파악하기 어려워질 수 있다.

#### 이벤트 집합 패턴과의 차이점

- 발행/구독 패턴은 이벤트 집합(Event Aggregation) 패턴과 유사하다.

- 두 패턴은 구조적 측면으로 같다고 생각해도 되지만, 이벤트(topic)를 보내는 발행자와, 알림 또는 이벤트을 받는 구독자의 사이 관계, 워크플로 처리 형태와 목적, 즉 패턴에 의도에 차이점이 있다.

**발행/구독 패턴 특징**

- 발행자와 구독자 사이 이벤트 흐름의 시나리오가 명확하며, 워크플로 정의를 중요시한다.

- 발행자와 구독자가 명확이 정의되어 있고 topic(channel)을 합의하여 데이터 교환이 이루어진다.

  - 이는 기능적으로 이벤트 집합 패턴에서 이벤트를 합의하여 서드 파티 객체를 통해 통신하는 것과 같다. 그저 중앙 관리자인 서드 파티 객체(관리 채널)의 이름만 다를 뿐이다.

- 즉, 이벤트의 흐름과 시나리오 처리에 집중된 행위 패턴이며, 이벤트 집합 패턴 방식보다 다소 복잡하고 무거운 작업을 할 때 발행/구독 개념 사용.

**이벤트 집합 패턴 특징**

- 여러 이벤트를 통합적으로 관리하는 중앙 관리자의 역할에 집중.

- 발행자와 구독자가 특정되지 않는 경우가 많다.

- 발행/구독 패턴 방식보다 가벼운 작업에 대해 해당 개념 사용 (주로 가벼운 이벤트 흐름이나 UI 이벤트 등에서 하나의 이벤트 버스로 간단히 관리할 때)

### 중재자 패턴

- 중재자(Mediator) 패턴은 다수의 객체들이 직접 통신하지 않고 중앙 객체(중재자)를 통해 상호작용하도록 만드는 디자인 패턴이다.

- 중재자 패턴은 **워크플로 객체(중재자 객체)** 를 중앙 관리자로 두어 비즈니스와 로직과 워크플로를 중재자 내부로 집중시킨다. 따라서 객체(협력자) 사이 이벤트 처리를 조건에 따라 제어한다.

**중재자 패턴 구성 요소**

- Mediator - 중재자의 행위를 추상적으로 정의한 인터페이스

- Concrete Mediator - 중재자 인터페이스의 행위를 구현한 클래스(인스턴스)

- Colleague - 중재자와 소통할 수 있는 협력자의 행위를 추상화 하여 포함한 인터페이스

- Concrete Colleague - 협력자 인터페이스를 구현한 클래스(인스턴스)

**이벤트 집합(Event Aggregation - Pub/Sub) 패턴과 비교**

- 유사점

  - 이벤트 집합 패턴과 같이 중앙 관리자를 두어 객체 사이의 관계를 느슨하게 하는 특징은 동일하다고 볼 수 있다.

- 차이점

  - 이벤트 집합 패턴에서 서드 파티 객체(이벤트 채널)는 이벤트가 연결되도록 지원하는 역할만 하기 때문에 내부적으로 이벤트 처리에 대한 제어를 하지 않는다. 즉, 모든 워크플로와 비즈니스 로직은 발행자(Source), 구독자(handler) 객체에 직접 구현된다.

  - 중재자 패턴에서 비즈니스 로직과 워크플로는 서드 파티 객체(중재자) 내부에 집중된다. 자신이 소유한 정보를 바탕으로 각 협력자 객체들의 행위(메서드 호출) 필요성을 판단한다. 즉, 객체들의 적절한 행위 시기를 판단하여 알려준다.

  - 이벤트 집합 패턴은 **발행 후 망각(fire and forgot)** 방식의 소통 모델을 사용한다. 발행자는 구독자의 존재 여부와 상관없이 이벤트를 발행한 후 처리를 위임한다.

  - 중재자 패턴은 미리 설정해 둔 특정 입력(arguments) 또는 활동에 주목하여 역할이 분명한 협력자 사이의 행동을 조율한다.

**중재자 패턴을 활용한 메시지 전달 기능 구현**

```js
// Concrete Mediator
class Mediator {
	constructor() {
		this.participants = [];
	}

	register(participant) {
		participant.setMediator(this);
		this.participants.push(participant);
	}

	// 협력자(Colleague)의 행위를 입력값과 협력자 주체에 따라 다른 협력자의 행위를 중재자 내부에서 제어한다.
	send(message, from, to) {
		if (from === to) return;

		if (to) {
			to.receive(message, from);
		} else {
			this.participants.forEach((participant) => {
				if (participant !== from) participant.receive(message, from);
			});
		}
	}
}

// Concrete Colleague
class Participant {
	constructor(name) {
		this.name = name;
		this.mediator = null;
	}

	setMediator(mediator) {
		this.mediator = mediator;
	}

	// 협력자(Colleague)의 행위는 중재자(Mediator)와 소통한다.
	send(message, to) {
		this.mediator.send(message, this, to);
	}

	// 중재자의 제어 로직에 따라 협력자의 행위가 호출된다.
	receive(message, from) {
		console.log(
			`${this.name} received message: ${message} - from ${from.name}`
		);
	}
}

const mediator = new Mediator();

const bob = new Participant('Bob');
const alice = new Participant('Alice');
const john = new Participant('John');

mediator.register(bob);
mediator.register(alice);
mediator.register(john);

bob.send('hello bob!', alice);

alice.send('hello everyone!');

john.send('hello john', john);
```

### 커맨드 패턴

- 커맨드 패턴은 명령을 내리는 객체(Invoker)와 명령을 실행하는 객체(Receiver)를 분리함으로써 객체의 책임을 분리하는 패턴이다.

- 주체(Invoker)의 행위 또는 명령을 입력값(arguments)와 함께 객체(Command)로 캡슐화하고, 명령을 내리는 객체(Invoker)로 입력함으로써 실행을 위임한다. 따라서 실행 시점, 취소, 로그(redo, undo, log 등)를 유연하게 제어할 수 있다.

- 커맨드 패턴은 설계의 유연성, 확장성 측면에서 장점을 제공하지만, 주체의 행위를 객체로 캡슐화 하기 때문에 각 행위마다 새로운 클래스를 선언해야 한다. 따라서 코드의 규모(클래스 수)가 커지는 단점이 있다.

**커맨드 패턴 구성 요소**

- Command: 주체가 수행하는 동작에 대해 여러 형태를 통합된 API 동작으로 인터페이스

- Concrete Command: Command 인터페이스를 기반으로 특정 주체의 행위(메서드) 실행을 구현하고, 이를 캡슐화한 클래스(인스턴스)

- Receiver: 명령에 대한 핵심 로직을 가진 주체, 명령 실행 권한을 Invoker 객체에 위임한다.

- Invoker: Receiver 객체로부터 캡슐화된 명령 객체를 입력 받아 실행을 제어하는 클래스(인스턴스)

**전통적인 커맨드 패턴 구현**

```js
// Command interface
class Command {
	execute() {
		throw 'this method must be overridden';
	}
	undo() {} // optional
}

// Concrete Command
// 각 명령에 대해 입력값(arguments)을 받아 캡슐화 한다.
// 주체의 작업을 클래스 이름으로 표현하고, 각 메서드는 Invoker 객체가 호출할 수 있는 제어 목적의 공통된 인터페이스로 정의한다.
class AddTextCommand extends Command {
	constructor(document, text) {
		super();
		this.document = document;
		this.text = text;
	}

	execute() {
		this.document.addText(this.text);
	}

	undo() {
		this.document.remove(this.text.length);
	}
}

// Concrete Command
class AddTextCommandAtFront extends Command {
	constructor(document, text) {
		super();
		this.document = document;
		this.text = text;
	}

	execute() {
		this.document.addTextAtFront(this.text);
	}

	undo() {
		this.document.removeAtFront(this.text.length);
	}
}

// Receiver
class DocumentReceiver {
	constructor() {
		this.content = '';
	}

	addText(text) {
		this.content += text;
		console.log(this.content);
	}

	addTextAtFront(text) {
		this.content = text + this.content;
		console.log(this.content);
	}

	remove(length) {
		this.content = this.content.slice(0, this.content.length - length);
		console.log(this.content);
	}

	removeAtFront(length) {
		this.content = this.content.slice(length, this.content.length);
		console.log(this.content);
	}
}

// Invoker - 명령에 필요한 입력값들은 명령 객체에 캡슐화 되어 있다. 따라서 실행 제어만 담당한다.
class CommandInvoker {
	constructor() {
		this.commandHistory = [];
	}

	runCommand(cmd) {
		cmd.execute();
		this.commandHistory.push(cmd);
	}

	undo() {
		const cmd = this.commandHistory.pop();

		if (cmd?.undo) cmd.undo();
		else {
			console.log("command history doesn't exist");
		}
	}

	// 최근 실행 명령을 재실행 한다.
	redo() {
		if (this.commandHistory.length > 0) {
			const cmd = this.commandHistory[this.commandHistory.length - 1];
			cmd.execute();
			this.commandHistory.push(cmd);
		}
	}
}

const doc = new DocumentReceiver();
const invoker = new CommandInvoker();

const command1 = new AddTextCommand(doc, 'hello! ');
const command3 = new AddTextCommandAtFront(doc, 'say - ');
const command2 = new AddTextCommand(doc, 'world!');

invoker.runCommand(command1);
invoker.runCommand(command2);
invoker.runCommand(command3);

invoker.undo();
invoker.undo();
invoker.undo();
```

## 자바스크립트 MV\* 패턴

### MVC 패턴

- 현재 널리 알려진 MVC 패턴의 개념은 전통적인 MVC 패턴의 변형이다.

- MVC 패턴은 트리베 린스카우그(Trygve Reenskaug)는 smalltalk-80의 작업중 처음 설계했으며, 그 당시 Model-View-Controller-Editor 라고 불렸다.

- 이후 MVC는 GoF의 디자인 패턴과 여러 프레임워크에서 널리 소개되며 현재의 MVC 관점과 전통적인 smalltalk-80 MVC 개념이 약간 분리되었다.

- smalltalk-80 MVC 패턴은 애플리케이션 로직(Model)과 UI(View + Controller)를 분리하는 것을 목표로 한다. 이로써 애플리케이션의 일부를 분리함으로써 모델을 다른 인터페이스에서도 재사용할 수 있다.

**smalltalk-80 MVC 아키텍처 구성요소**

- Model

  - 도메인 관련 데이터를 표현 했으며, 관찰자(Observer)패턴을 활용해 자신이 변경되면 알림을 보냈다.

- View

  - 모델의 현재 상태를 표현한다.

  - 관찰자 패턴을 활용해 모델(Model)이 변경되면 알아차려 최신 상태의 모델을 표현할 수 있다.

- Controller

  - 사용자와 상호작용을 처리하고 뷰에 무엇을 보여주고, 사용자의 입력을 어떻게 처리할지 결정한다.

- smalltalk-80 MVC 패턴은 디자인 패턴이 일부로써 포함되며, 뷰와 컨트롤러가 직접적으로 연결되어 있다.

**Modern MVC 아키텍처 구성요소**

- Model

  - 애플리케이션의 데이터를 관리하는 역할, 애플리케이션의 필요한 고유 데이터 부분을 담당한다.

  - 리엑트의 useState, useReducer Hook에 저장된 상태(state)와 같다고 볼 수 있다.

- View

  - 모델에 대한 시각적인 표현, 현재 상태의 특정 부분만을 보여주는 역할을 담당.

  - 사용자와 상호작용하며, 모델을 관찰한다. 모델이 변경되면 알림을 받아 스스로 업데이트를 할 수 있다. 즉, 모델의 데이터를 읽고 수정하는 기능까지 포함한다.

  - 리엑트의 **JSX 부분(template)** 과 상태(state)를 관찰하는 기능, 사용자에게 표현하는 기능을 포함한 컴포넌트 객체와 같다고 볼 수 있다.

  - 뷰를 둔하다(dumb)고 하는데, 이는 뷰가 컨트롤러와 모델에 대한 정보를 제한적으로 가지기 때문이다.

- Template

  - 탬플릿은 뷰와 연관되며, 화면에 표현될 요소들의 구조를 정의한다. 이는 JSX 부분, HTML 뼈대와 같다.

  - 뷰는 탬플릿과 모델을 참고하여 최종적으로 화면에 표현할 형태를 확정하고, 표현(Render)한다.

- Controller

  - 모델과 뷰 사이 중재자 역할을 하며, 사용자가 뷰를 조작할 때 모델을 업데이트 한다. 즉, 모델과 뷰 간의 로직을 관리한다.

  - 리엑트의 이벤트핸들러(Event handler)와 같다고 볼 수 있다.

**MVC패턴의 이점**

- 유지보수의 단순화

  - 뷰와 로직을 분리(관심사를 분리)함으로써 변경사항이 발생할 때 어떤 영역(뷰 또는 로직)의 변경사항인지 확실하게 구분할 수 있다.

- 테스트 가능성

  - 관심사를 분리하였기 때문에 비즈니스 로직에 대한 단위 테스트 작성이 간편하다.

- 협업 가능성

  - 관심사를 분리하였기 때문에 코어 로직을 담당하는 개발자와 UI를 담당하는 개발자가 동시에 작업이 가능하다.

### MVP 패턴

- MVP 패턴은 MVC 패턴에서 뷰가 모델을 관찰하지 않도록 하며, 대신 프레젠테이션 로직의 개선에 초점을 맞춘 MVC 패턴의 파생이다.

**MVC 패턴과 차이점**

- MVC 패턴에서 컨트롤러 대신 포함된 프레젠터(Presenter)는 뷰에 대한 UI 비즈니스 로직을 담당한다.

- MVC 패턴에서 뷰는 모델을 관찰(Observer)해 상태를 스스로 업데이트 하지만 MVP 패턴에서 뷰는 오직 Presenter와 상호작용 한다.

- MVP에서 뷰는 순수하게 받은 데이터에 대해 화면에 표시(Render)하는 역할만 한다. 뷰는 모델을 알 필요가 없으며, 프레젠터가 뷰에게 표현할 데이터를 전달한다.

  - 리엑트에서 순수 컴포넌트(Pure Component / Presentational Component)와 같다.

**프레젠터(Presenter)**

- 프레젠터는 순수 컴포넌트에 UI관련 데이터를 props로 넘겨주는 역할을 하는 Contaier Component와 같다고 볼 수 있다.

- Container/Presentational 패턴에서 활용되며, 현재 react 커스텀 컨트롤러 훅을 통해 대체할 수 있다.

- 컨트롤러 훅에는 표현할 데이터의 상태(Model)와 상태를 조작하고, 표현해야 하는 데이터를 뷰로 전달하는 로직(Presenter)이 모두 포함되었다 볼 수 있다.

### MVVM 패턴

- MVVM 패턴은 MVC, MVP를 기반으로 하는 아키텍처 패턴이며, UI 부분과 비즈니스 로직, 동작 부분을 명확히 분리한다.

- MVVM은 **선언적 데이터 바인딩** 을 활용하여 뷰에 대한 작업을 다른 게층과 분리할 수 있도록 한다.

  - 리엑트의 JSX 뷰에서 상태를 선언적(${state})으로 바인딩함으로써 뷰모델에서 조작하는 상태와 자동으로 동기화 한다.

**MVVM 패턴 구성요소**

- Model: 다른 MV\* 패턴과 같이 상태를 표현한다.

- View: 순수하게 데이터를 표현하는 역할을 한다. Presentational Component와 같다.

- Model View: 모델의 정보를 뷰가 사용할 수 있는 형태로 변환하고, 뷰에서 발생한 명령(event)을 모델로 전달한다. Container Component와 같다.
