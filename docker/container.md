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

## Docker container 생성

- ### ports를 "3306":"3306"으로 mapping해서 local machine의 3306포트를 사용하려 했는데, 이미 mysql server를 실행하고 있기 때문에 3306 할당을 할 수 없었다.
  - #### 포트에 할당된 자원 확인하기
    - #### 우선 현재 포트에 할당된 프로세스를 확인할 필요가 있었다. 이를 위해 `lsof(list open files)`명령어를 사용한다.
    ```zsh
      sudo lsof -i:3306
    ```
    - #### 확인해보니 3306 port에서 mysql이 실행되고 있었다.
  - #### 3306포트에 할당된 프로세스 제거
    - #### 우선 lsof로 PID를 확인 한 후 제거한다.
    ```zsh
      sudo kill -9 [pid]
    ```
    - #### -9(SIGKILL)로 강제 제거했지만 계속 실행이 되었다.
- ### 따라서 Local machine에는 3307포트를 사용하기로 했다.

## Docker Container에 접근

- ### Local에서 설정한 volume script들이 실행이 안되어 Docker로 접근 하는 방법을 알아보았다.

```bash
  docker exec [contatner_name] bash
```

- ### bash로 실행해서 dir구조를 봐봤는데 volume scripts들은 docker에 잘 생성이 되었다. 알고보니까 sql을 잘못 생성했다.
