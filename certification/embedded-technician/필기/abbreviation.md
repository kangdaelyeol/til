# abbreviation

## Vcc(Voltage at the Common Collector)

### 정의

트랜지스터(일반적으로 BJT)의 컬렉터(Collector)쪽에 공급되는 양(+) 전원을 의미한다.

주로 5V 또는 3.3V 전압을 의미한다.

VCC는 회로의 동작 전압을 나타내므로, 해당 IC의 데이터시트에서 요구하는 전압(5V, 3.3V, 1.8V 등)을 정확히 입력해야 기기가 정상 작동한다.

### 유래

BJT 트랜지스터의 컬렉터(Collector)에 공급되는 전압(Voltage)에서 유래된 용어다.

### Vcc vs Vdd

Vcc는 BJT 회로의 전원 표기이며, MOSFET/CMOS 회로에서는 드레인(Drain)에 대응하는 **Vdd(Voltage Drain Drain)** 를 사용한다.

현대 디지털/임베디드 회로는 대부분 CMOS 기반이라 Vdd가 더 일반적이지만, 관행적으로 양(+) 전원 공급선을 Vcc로 통칭하는 경우도 많다.

| 표기 | 대응 소자 |      의미       |
| :--: | :-------: | :-------------: |
| Vcc  |    BJT    | 컬렉터 전원 (+) |
| Vee  |    BJT    | 이미터 전원 (-) |
| Vss  |  MOSFET   | 소스 전원 (GND) |
| Vdd  |  MOSFET   | 드레인 전원 (+) |
