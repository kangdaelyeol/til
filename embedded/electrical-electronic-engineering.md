# 임베디드 기능사 필기

## 전기전자공학

### 펄스파형(Pulse waveform)

이상적인 디지털 펄스에서는 High상태와 Low 상태 사이 변화 포인트가 직각 형태로 이루어져 있지만, 실제 파형에서는 High와 Low 상태 사이의 변화가 순간적으로 이루어지지 않는다.

#### 펄스파형 구성 요소(Pulse waveform Components)

##### 상단(Top)

펄스가 높은 상태를 유지하는 구간.

##### 하단(Base)

펄스가 낮은 상태를 유지하는 구간.

##### 상승 에지(Rising edge)

펄스가 하단에서 상단으로 전환되는 부분

##### 하강 에지(Falling edge)

펄스가 상단에서 하단으로 전환되는 부분

##### 상승 시간(Rise time)

펄스 진폭이 10%에서 90%까지 도달하는 데 걸리는 시간

##### 하강 시간(Fall time)

펄스 진폭이 90%에서 10%까지 내려가는 데 걸리는 시간

##### 오버슈트(Overshoot)

펄스가 상승하여 목표값에 도달한 후 초과적으로 펄스 강도가 그 이상으로 올라갔다가 돌아오는 현상

##### 링잉(Ringing)

오버슈트(Overshoot)이후 상승 목표값 주위로 펄스가 작게 진동하는 현상

##### 펄스 폭(Pulse width)

펄스가 높은 상태를 유지하는 구간의 시간 길이. 보통 상승 펄스 단계에서 최대 진폭의 50%에 도달 할 때부터 하강 펄스 단계에서 최대 진폭의 50%에 도달할 때 까지의 시간을 의미.

##### 언더슈트(Undershoot)

펄스 하강시 목표 최저값 도달 후 전압이 밑으로 튀어 목표 최저값보다 일시적으로 낮아지는 현상.

##### 주기(Period)

하나의 펄스가 진행되는 전체 시간 길이.

##### 듀티 사이클(Duty cycle)

펄스 주기(Period)에서 상승 상태의 비율.

펄스 주기가 10ms이고 High 구간이 3ms이면, Duty cycle은 30%.

##### 새그(Sag)

펄스 상승후 출력 전압 레벨이 서서히 낮아지는 현상.

일반적으로 축전기(Capacitor)의 축전(충전)으로 인해 양단에 전압차가 생겨서 출력 전압 레벨을 유지하지 못하고 천천히 전압이 낮아진다고 한다.

##### 백슈트(Backswing)

펄스 하강 이후, 축전기(Capacitor)에 저장된 전기 에너지로 인한 양단 전압차로 인해 일시적으로 출력 전압이 기준 레벨 보다 낮아지는 현상.

축전기에 저장된 전압이 모두 소진될 때 까지 유지되었다 서서히 정상 레벨로 돌아온다.

**포스트슈트(Postshoot)** 라고도 불림

## 전자 계산기 구조

### 주소 명령어(Address Instruction)

주소 명령어는 주소를 몇 개 포함하느냐에 따라 구분됨.

주소 명령어는 컴퓨터 구조에서 **레지스터** 연산을 위해 사용됨.

#### 0-주소 명령어(Zero-address Instruction)

주소가 포함되지 않은 명렁어.

**스택(stack)** 메모리와 관련된 역할을 수행할 때 사용됨.

```text
Expression: X = (A+B)*(C+D)
Postfixed : X = AB+CD+*
TOP means top of stack
M[X] is any memory location

---------------------------

PUSH A   ->   TOP = A
PUSH B   ->   TOP = B
ADD      ->   TOP = A+B
PUSH C   ->   TOP = C
PUSH D   ->   TOP = D
ADD      ->   TOP = C+D
MUL      ->   TOP = (C+D)*(A+B)
POP X    ->   M[X] = TOP
```

#### 1-주소 명령어(One-address Instruction)

**누산기(Accumulator)** 를 묵시적 피연산자로 사용하고, 나머지 하나의 피연산자 주소만 명령어에 명시하는 방식.

명시된 피연산자의 주소를 참조하여 누산기의 데이터와 함께 연산을 수행.

구조

| 조작부호 (Opcode) |  모드 (Mode)   | 오퍼랜드 / 오퍼랜드 주소 (Operand / Address of Operand) |
| :---------------: | :------------: | :-----------------------------------------------------: |
|    연산 명령어    | 주소 지정 모드 |             피연산자 값 또는 피연산자 주소              |

```text
Expression: X = (A+B)*(C+D)
AC is accumulator
M[] is any memory location
M[T] is temporary location

---------------------------

LOAD A    ->    AC = M[A]
ADD B     ->    AC = AC + M[B]
STORE T   ->    M[T] = AC
LOAD C    ->    AC = M[C]
ADD D     ->    AC = AC + M[D]
MUL T     ->    AC = AC * M[T]
STORE X   ->    M[X] = AC
```

#### 2-주소 명령어(Two-address Instruction)

상업 컴퓨터에서 주로 사용되는 명령어.

목적지 주소(Destination)와 소스 주소(Source) 총 2개를 포함하여 연산을 수행. 연산 결과는 목적지 주소에 저장됨.

구조

| 조작부호 (Opcode) |  모드 (Mode)   |                목적 주소 (Destination address)                 |   자원 주소 (Source address)   |
| :---------------: | :------------: | :------------------------------------------------------------: | :----------------------------: |
|    연산 명령어    | 주소 지정 모드 | 피연산자 주소면서 연산 결과가 저장될 레지스터 또는 메모리 주소 | 피연산자 값 또는 피연산자 주소 |

```text
Expression: X = (A+B)*(C+D)
R1, R2 are registers
M[] is any memory location

---------------------------

MOV R1, A    ->    R1 = M[A]
ADD R1, B    ->    R1 = R1 + M[B]
MOV R2, C    ->    R2 = M[C]
ADD R2, D    ->    R2 = R2 + M[D]
MUL R1, R2   ->    R1 = R1 * R2
MOV X, R1    ->    M[X] = R1
```

#### 3-주소 명령어(Three-address Instruction)

목적지 주소와 피연산자 주소 2개를 포함하여 총 3개의 주소를 포함한 명령어.

하나의 명령어로 두 피연산자와 결과 주소를 모두 지정할 수 있어 프로그램의 명령어 수가 줄어들지만, 명령어 자체의 길이가 길어져 명령 수행 속도가 빨라지지는 않음.

구조

| 조작부호 (Opcode) |  모드 (Mode)   |       목적 주소 (Destination address)        |   자원 주소 (Source address)   |   자원 주소 (Source address)   |
| :---------------: | :------------: | :------------------------------------------: | :----------------------------: | :----------------------------: |
|    연산 명령어    | 주소 지정 모드 | 연산 결과가 저장될 레지스터 또는 메모리 주소 | 피연산자 값 또는 피연산자 주소 | 피연산자 값 또는 피연산자 주소 |

```text
Expression: X = (A+B)*(C+D)
R1, R2 are registers
M[] is any memory location

---------------------------

ADD R1, A, B    ->    R1 = M[A] + M[B]
ADD R2, C, D    ->    R2 = M[C] + M[D]
MUL X, R1, R2   ->    M[X] = R1 * R2
```
