## DBCP(Database Connection Pool)

- ### DBCP는 DB의 연결(Connection)을 관리해주는 도구다.
- ### `Connection Pool`이 설정된 `Connection size`만큼 연결을 허용해준다.
- ### Hikari CP는 빠르고 간단한(zero-overhead) production 지원 JDBC connection pool이다.
- ### connection-test-query 설정으로 헤당 쿼리문으로 `연결의 유효성`을 검사한다.
- ### pool-size를 설정함으로 연결 수를 제한 할 수 있다.

```yaml
spring:
  datasource:
    # database관한 설정
    hikari:
      connection-test-query: 'SELECT 1' # 간단한 쿼리로 부하 최소화
      maximum-pool-size: 20 # minimun-idle 생략 가능
```
