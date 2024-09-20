### 셸 스크립트

```sh
#!/bin/bash

export LOCAL_DB_URL='DB_URL'
export LOCAL_DB_USERNAME='username'
export LOCAL_DB_PASSWORD='password'

JAR_PATH='/home/ubuntu/hoonsletter/hoonsletter_back_springboot-0.0.1-SNAPSHOT.jar'

LOG_DIR='/var/log/hoonsletter'
LOG_FILE="$LOG_DIR/hoonsletter-app.log"

mkdir -p $LOG_DIR

sudo -E nohup /usr/bin/java -jar $JAR_PATH > $LOG_FILE 2>&1 &
echo $! > hoonsletter-app.pid
echo "hoonsletter application service started. PID: $(cat hoonsletter-app.pid)"
```

### export

- 환경 변수를 설정한다.

- `single quote`로 값을 감싸서 값 안에 특수문자를 텍스트로 해석되게 한다.

- 만약 값에 특수 문자, `$`기호를 써서 스크립트 안에 설정해둔 변수에 접근 할 경우 `double quote`를 사용한다.

### mkdir

- `make directory`, directory를 생성함

- `-p` option 

  - -p 는`parents`의 약어다.

  - 생성 경로에 상위 디렉터리가 없는 경우 강제로 생성해서 반드시 디렉터리를 생성한다.

  - 이미 해당 경로에 같은 이름의 디렉터리가 존재하는경우 에러를 발생시키지 않고 그냥 넘어간다.

