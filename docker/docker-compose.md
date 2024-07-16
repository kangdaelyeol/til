```yaml
version: '3.8'

services:
  mysql:
    container_name: mysql_local
    image: mysql:8.3.0
    volumes:
      - ./db/conf.d:/etc/mysql/conf.d
      - ./db/initdb.d:/docker-entrypoint-initdb.d
    ports:
      - '3307:3306'
    environment:
      - MYSQL_DATABASE=batch_pass
      - MYSQL_USER=batch_user
      - MYSQL_PASSWORD=1234
      - MYSQL_ROOT_PASSWORD=1234
      - TZ=Asia/Seoul
```

### 해당 파일을 terminal에서 up 으로 실행하면 docker에서 mysql_local이라는 이름으로 container가 생성된다.

### `volumes`를 정함으로써 container가 재실행 되어도 data가 유지될 수 있게끔 한다.

- #### 기본적으로 conatiner가 삭제되면 container의 데이터도 모두 삭제 되는데, host에서 volume을 지정해주면 매 실행마다 host에 있는 셋팅파일들이 container로 넘겨져 실행이 되어 data가 유지될 수 있다.
- #### 경로는 `<Local path>:<Container Path>`로 지정한다.

### `ports`설정으로 local port와 docker port를 연결하여 forwarding한다.

- #### 여기서 docker의 내부 포트 3306은 Local 3307 port로 `mapping`이 된다. 따라서 Local machine의 3307포트로 접근시 docker내부의 MySQL instance (3306)으로 연결이 된다.
- #### `container 생성시` volumes에 있는 스크립트가 실행되는데, `MySQL container가 최초로 실행될 때` 실행 된다.
