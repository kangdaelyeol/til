## utf8mb4

- ### mysql에서 charset을 `utf8mb4`를 사용하는데 `mb4`는 어떤 차이점이 있는지 궁금했다.
- ### utf8(Universal Coded Character Set + Transformation Format - 8-bit)는 일반적인 환경에서 1바이트부터 4바이트까지 가변 길이로 문자를 encoding한다.
- ### `MySQL`에서 utf-8 encoding 방식은 최대 `3bytes`까지만 지원하기 때문에 일부 기호나 특수 문자를 표현하지 못하는 경우가 있다고 한다.
- ### `mb4(mulit-byte 4)`는 MySQL에서 `진정한` UTF-8을 지원하기 위한 특수 format이라 한다.
- ### 그래서 MySQL에선 utf-8대신 utf8mb4 encoding을 사용하는 것이 좋다고 한다.
