### EUC-KR

- `Extended Unix Character - Korea`

- 한국어에 특화된 문자 인코딩 방식

- 이전에 많이 사용되었지만 현재는 대부분 UTF-8 인코딩 방식을 사용하고 있음.

- 현재 한국에서 사용되는 경우는 `lagacy 시스템`에서의 사용이 대부분이라 한다.

- `비 유니코드` 방식이며 한글은 2byte, ASCII는 1byte 공간을 사용함.

### UTF

- `Unicode Transformation Format`

- `Universal coded character set + Transformation format 이라고도 한다.`

- `UTF-8, 16, 32`인코딩 방식이 있으며, 각각 숫자는 `최소 인코딩 비트의 길이`를 의미한다.

- `UTF-8`방식이 대부분 웹 사이트에서 사용된다 함.

- #### UTF-8

  - ASCII인 경우 8비트를 사용하고, `한글의 경우 3Byte`를 사용한다.

  - EUC-KR과 비교해서 한글을 많이 사용하는 경우 EUC-KR이 더 효율적일 수 있다고도 한다.

- #### UTF-16

  - ASCII코드도 최소 2byte로 인코딩 되기 때문에, 영어를 사용하는 프로그램에서는 두 배로 비효율적이다.

  - 또한 `little / big endian` 두 방식으로 데이터를 저장할 수 있어서 시스템간 데이터 교환시 혼동을 줄 수 있다.

  - web개발, 데이터 전송, 파일 처리등에선 사용하지 않고 `window OS, Java의 문자열 처리`에서 사용된다 한다.

- #### UTF-32

  - 모든 문자를 `4Byte의 고정된 크기`로 관리한다.

  - 모든 문자를 고정된 크기로 관리하기 때문에 다른 encoding format과 비교해서 공간 비효율적이지만, `문자열 처리 로직이 매우 단순해진다`는 장점은 있다.
