# 임베디드 실기

## Table of Contents

### [메모리 최적화](#메모리-최적화)

- [enum 최적화](#enum-최적화)

- [타입 최적화](#타입-최적화)

### [로직 최적화](#로직-최적화)

- [RGB 변수](#rgb-변수)

- [로직 추상화](#로직-추상화)

- [논블로킹 최적화](#논블로킹-최적화)

---

## 메모리 최적화

### enum 최적화

**`문제점`**

led 스위치를 담당하는 메서드에서 분기 조건에 strcmp를 사용하며, char\* 타입의 변수리터럴 선언 및 파라미터 입력을 통한 오버헤드 발생

```cpp
void onLed(char* type) {
	offLed();
	if (strcmp(type, "red") == 0) { // char* literal
		...
```

**`해결방안`**

문자열 리터럴 대신 열거형 타입을 정의하여 메서드 파라미터에 대해 **강타입(Strong Type)** 을 적용한다.

강타입을 통해 if-else문에서 switch문으로 쉽게 정의할 수 있어 가독성이 개선됨.

열거형 변수의 범위는 0~2이므로 uint8_t 타입으로 변경하여 메모리를 절약한다.

- 현재 컴파일러는 C++11이므로, 열거형 변수의 기본 타입은 int(2-4byte)이다.

```cpp
// 타입 선언
typedef enum : uint8_t {
  RED, GREEN, BLUE
} LedColor;

// 기존 코드
onLed("red");

// 변경 코드
onLed(RED);
```

컴파일 타임(compile-time) 타입 체크로 인해 오타로 인한 런타임 에러를 사전에 방지할 수 있다.

### 타입 최적화

변수 값 범위를 파악하여 불필요한 범위의 메모리 공간을 절약.

**`stdint.h`**

플랫폼(컴파일러 + CPU스펙)에 따라 int 타입의 크기는 다를 수 있다.

stdint 헤더파일에는 각 플랫폼마다 다르게 할당되는 타입 크기를 고정하는 메커니즘이 구현되어 있다.

플랫폼에 상관 없이 보장된 크기를 할당하는 타입을 사용하는 것이 메모리 추적 및 관리에 유용하다.

```c
// stdint.h

/* actual implementation goes here */

typedef signed int int8_t __attribute__((__mode__(__QI__)));
typedef unsigned int uint8_t __attribute__((__mode__(__QI__)));
typedef signed int int16_t __attribute__ ((__mode__ (__HI__)));
typedef unsigned int uint16_t __attribute__ ((__mode__ (__HI__)));
typedef signed int int32_t __attribute__ ((__mode__ (__SI__)));
typedef unsigned int uint32_t __attribute__ ((__mode__ (__SI__)));
#if !__USING_MINT8
typedef signed int int64_t __attribute__((__mode__(__DI__)));
typedef unsigned int uint64_t __attribute__((__mode__(__DI__)));
#endif
```

**\_\_attribute\_\_** 는 GCC 컴파일러 전용 확장 문법으로, 컴파일러에게 추가 정보를 전달한다.

정수를 여러 크기(1·2·4·8byte)의 모드(mode)로 정의하여 플랫폼에 독립적인 고정 크기 타입을 구현한다.

| 이름                | 크기  |
| ------------------- | ----- |
| QI(Quarter Integer) | 1byte |
| HI(Half Integer)    | 2byte |
| SI(Single Integer)  | 4byte |
| DI(Double Integer)  | 8byte |

**`타입 변경`**

```c
// int = 2byte
const int sw1 = 2, sw2 = 3, sw3 = 4;
...

int action = 0;
...

// uint8_t = 1byte

const uint8_t sw1 = 2, sw2 = 3, sw3 = 4;
...

uint8_t action = 0;
...
```

## 로직 최적화

### RGB 변수

**`문제점`**

요구사항에 따르면 LED는 RGB 중 반드시 하나만 출력한다.

LED가 하나만 켜지므로 r g b 각각의 출력 체크 플래그를 선언하는 것은 메모리 낭비를 유발한다.

**`기존 코드`**

기존 구현사항에서 r g b 변수를 각각 두는 것은 타당성이 없다. LED가 반드시 하나만 켜지므로 r/g/b 중 최대 하나만 1이 되어, ON/OFF 여부 하나로 표현할 수 있기 때문이다.

```c
uint8_t r = 0;
uint8_t g = 0;
uint8_t b = 0;

void offLed() {
  ...
  r = g = b = 0;
}

void onLed(LedColor color) {
  offLed();

  switch(color){
    case RED:
    digitalWrite(ledR, HIGH); r = 1;
    break;
    case GREEN:
    digitalWrite(ledG, HIGH); g = 1;
    break;
    case BLUE:
    digitalWrite(ledB, HIGH); b = 1;
    break;
  }
}

void action1() {
  //...
  if(b == 0) {onLed(BLUE);} else {offLed();} // Blue가 ON인 경우와 LED자체가 ON인 경우와 논리적으로 같은 조건을 요구함.
  //...

```

**`변경 후`**

```c
uint8_t ledOn = 0; // r g b를 ledOn으로 통합

void offLed() {
  digitalWrite(ledR, LOW);
  digitalWrite(ledG, LOW);
  digitalWrite(ledB, LOW);
  ledOn = 0;
}

void onLed(LedColor color) {
  offLed();
  ledOn = 1;
  switch(color){
...


void action1() {
  //...
  if(ledOn == 0) {onLed(BLUE);} else {offLed();} // Blue가 ON인 경우와 LED자체가 ON인 경우와 논리적으로 같은 조건을 요구함.
  //...
```

### 로직 추상화

가독성 향상을 위해 기존 하드코딩된 로직을 추상화할 수 있다.

**`매크로 추상화`**

기본적으로 메서드 형태로 선언하지만, 함수 스택을 추가하게 되면 그 만큼 CPU자원 낭비가 있기 때문에 간단한 추상화는 매크로로 정의한다.

```c
// 매크로 정의
#define IS_LED_OFF (ledOn == 0)
#define FND_ZERO (fndNumber == 0)
#define FND_MAX (fndNumber == 99)
...
void action1() {
  showFnd(fndNumber, 5);
  if(FND_ZERO) { // 로직 추상화
    ...
  if(IS_LED_OFF) {onLed(BLUE);} else {offLed();} // 로직 추상화
```

**`중복 로직 모듈화`**

fnd 출력이 반복되는 로직을 모듈화할 수 있다.

기존 코드에서 fnd출력은 반드시 digitalWrite 함수를 2번 호출하므로, 해당 로직을 캡슐화 하여 가독성을 향상할 수 있으며 메모리 최적화도 가능하다.

```c
void showFnd(int num, int time) {
	int tensDigit = num / 10;
	int onesDigit = num % 10;

  // digitalWrite에 대한 명령어가 메모리상으로 스택에 그대로 쌓이게 되어 메모리가 낭비된다.
	for (int t = 0; t < time; t++) {
		digitalWrite(fnd1, HIGH); // ~6byte
		digitalWrite(fnd2, LOW); // ~6byte
		for (int i = 0; i < 4; i++) {
			digitalWrite(fndPins[i], (tensDigit >> i) & 1);
		}
		delay(5);
		digitalWrite(fnd1, LOW); // ~6byte
		digitalWrite(fnd2, HIGH); // ~6byte
		for (int i = 0; i < 4; i++) {
			digitalWrite(fndPins[i], (onesDigit >> i) & 1);
		}
		delay(5);
	}
}

void resetAction() {
	offLed();
	action = 0;
	for (int i = 0; i < 2; i++) {
    // digitalWrite에 대한 명령어가 메모리상으로 스택에 그대로 쌓이게 되어 메모리가 낭비된다.
		digitalWrite(fnd1, HIGH);// ~6byte
		digitalWrite(fnd2, HIGH);// ~6byte
		showFnd(88, 200);
		digitalWrite(fnd1, LOW); // ~6byte
		digitalWrite(fnd2, LOW); // ~6byte
		clearFnd();
		delay(1000);
	}
}
```

다음과 같이 fnd 출력 로직을 모듈화 하여 메모리를 절약할 수 있다.

`setFndOn` 함수 내부에서 `digitalWrite` 2회 호출 = ~6byte × 2 = ~12byte 크기를 차지.

호출부에서는 인자 2개 로딩 + RCALL로 ~6byte만 필요하므로, 직접 호출(~12byte) 대비 호출 1회당 약 6byte를 절약한다.

```c
// 각 fnd 출력을 담당
void setFndOn(uint8_t fnd1On, uint8_t fnd2On){
  digitalWrite(fnd1, fnd1On); digitalWrite(fnd2, fnd2On);
}

// flag 초기화 로직
void resetFlag() {
      action = 0;   // STD(store with displacement) 명령어 ~2바이트
    swPushed = 0;  // unsigned long = 4바이트 → 4번 STD ~8바이트
    maxPushed = 0; //  unsigned long = 4바이트 → 4번 STD ~8바이트
}
```

기존 로직을 추상화 하여 명령어를 줄인다.

```c
void resetAction() {
  offLed();
  action = 0;
  for(uint8_t i = 0; i<2; i++){
    setFndOn(HIGH, HIGH); // ~-6byte
    showFnd(88, 200);
    setFndOn(LOW, LOW); // ~-6byte
    ...
  setFndOn(HIGH, HIGH); // ~-6byte
}

void showFnd(uint8_t num,  uint8_t time) {
  uint8_t tensDigit = num / 10;
  uint8_t onesDigit = num % 10;

  for(uint8_t t = 0; t < time; t++){
  setFndOn(HIGH, LOW); // ~-6byte
  for(uint8_t i = 0; i < 4; i++){
    digitalWrite(fndPins[i], (tensDigit >> i) & 1);
  }
  delay(5);
  setFndOn(LOW, HIGH); // ~-6byte
  ...

void action1() {
  ...
  if(digitalRead(sw1) == HIGH){
    resetFlag(); // ~-6byte
    onLed(RED);
  }
}
```

### 논블로킹 최적화

**`문제점`**

동작 도중 스위치를 눌렀다 떼면 동작이 변경되어야 함.

Arduino는 싱글 스레드로 동작하므로, `delay` 실행 중에는 `loop()` 자체가 멈춰 스위치 입력을 받을 수 없는 상태가 된다.

따라서 `delay` 사용 시 스위치 입력을 감지할 수 없어 동작 전환이 되지 않는 문제가 발생한다.

**`millis()`**

시스템 시작 후 경과된 시간(ms)을 반환하는 함수.

블로킹 없이 현재 시각을 조회할 수 있어 논블로킹 타이머 구현에 활용된다.

**`논블로킹 타이머 패턴`**

`millis() - lastTime >= interval` 패턴으로 블로킹 없이 주기적 동작을 구현한다.

- `lastTime`: 마지막 동작이 실행된 시점의 타임스탬프
- 조건이 참이면 동작을 실행하고 `lastTime = millis()` 로 기준점을 갱신
- 조건이 거짓이면 루프를 계속 진행하여 스위치 입력 등 다른 처리를 수행할 수 있다.

**`구현`**

초기 동작(LED 점멸, FND 표시 등 시작 시퀀스)은 완료되기 전에 스위치 입력을 받으면 의도치 않은 동작 전환이 발생하므로 블로킹 방식으로 진행한다.

이후 `actionMillis` 에 현재 시각을 기록하고, `millis() - actionMillis >= 동작주기` 조건으로 주기를 판단한다.

동작 주기를 넘기면 다음 동작 로직을 실행하고 `actionMillis` 를 갱신하여 다음 주기의 기준점으로 삼는다.

동작 주기를 넘기지 않으면 해당 동작을 유지하며 루프를 진행하여 스위치 입력을 받을 수 있도록 한다.

```c
void action1Active() {
  fndNumber = 8;
  offLed();
  showFnd(); delay(500);
  onLed(ledG); delay(200);
  onLed(ledR); delay(200);
  fndNumber = 0;
  showFnd();
  action = 1;
  actionMillis = millis();
}

void action1() {
  if(millis() - actionMillis >= 300) { // 동작 주기 = 300ms
    IS_LED_ON ? offLed() : onLed(ledG);
    fndNumber = (fndNumber+1) % 10;
    showFnd();
    actionMillis = millis();
  }
}
```
