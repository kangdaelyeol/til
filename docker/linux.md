## 셸 스크립트

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

<hr />

### mkdir

- `make directory`: directory를 생성함

- `-p` option

  - -p 는`parents`의 약어다.

  - 생성 경로에 상위 디렉터리가 없는 경우 강제로 생성해서 반드시 디렉터리를 생성한다.

  - 이미 해당 경로에 같은 이름의 디렉터리가 존재하는경우 에러를 발생시키지 않고 그냥 넘어간다.

<hr />

### sudo

- `superuser do`: root 사용자 환경에서 실행한다.

- root 사용자 권한으로 실행할 때 새로운 셸(root 권한 셸)이 실행되어 해당 명령어를 수행하기 때문에 다른 프로세스 환경에서 살행한다. 즉 `pid`가 다르다.

- 하나의 스크립트 파일에 여러 sudo문이 있을 때 각 명령어에 대한 루트 셸을 실행한다.

- 그래서 여러 sudo 명령어가 있는 셸 스크립트를 실행시키면 비동기적으로 처리 되는 줄 알았는데 아니다.

  - 각 sudo명령어는 `순차적으로` 처리된다.

- nohup(no hang up)을 사용한 경우

  - spring 프로젝트를 백그라운드에서 실행하기 위해 nohup 명령어를 사용했다.

  ```sh
  sudo -E nohup java -jar $JAR_PATH > $LOG_FILE 2>&1 &
  ```

  - 이를 통해 `nohup process`를 실행시키고 여기서 spring 서버를 실행시킨다.

  - 셸 스크립트에서 spring 서버가 실행되는 pid를 저장하도록 했는데 여기서 막히는 부분이 있었다.

  ```sh
  echo $! > hoonsletter-app.pid
  echo "hoonsletter application service started. PID: $(cat hoonsletter-app.pid)"
  ```

  - 실제 서버의 pid가 echo될 줄 알았는데, sudo로 실행된 루트 셸의 pid가 저장되어 있었다.

<hr />

### lsof

- `list open files`: 시스템에서 열린 파일, 네트워크 연결 정보를 나열함

- `-i` option

  - 정확한 의미는 찾지 못했지만 [IP / network connection에 관한 내용](https://www.ubuntu-user.com/Magazine/Archive/2016/31/lsof-finds-shows-and-searches-data-streams)이라 한다.

  - -i 옵션을 사용해 포트에 할당된 pid를 확인할 수 있다.

  - 보통 springboot app을 실행시키면 할당되는 8080포트를 확인하면 실제 springboot app의 pid를 확인 할 수 있었다.

<hr />

### pgrep

- `process grep`: 특정 조건에 부합하는 프로세스를 검색한다.

- `-f` option

  - `full` - `command line`을 기준으로 프로세스를 검색한다.

  - linux에서 프로세스가 실행되면 기본적으로 `'/proc/<pid>/cmdline` 경로에 어떤 명령어에 대해 실행되었는지에 대한 정보를 저장한다.

- 해당 명령어로 실행한 springboot app을 검색했는데 총 세개의 pid가 나왔다.

```sh
pgrep -f "java -jar"

# 실행 결과
20096
20098
20099
```

- 결론적으로 springboot app을 백그라운드에서 실행되기 위해 세 개의 프로세스를 실행했던 것이다

  - sudo에 의한 루트 셸 pid

  - nohup process pid

  - springboot app pid

- 스크립트에서 `$!`는 마지막으로 실행된 프로세스의 pid를 의미하는데, 여기서 `$!`는 `root shell의 pid`를 저장하고 있었고, root shell에서 nohup process, 그 안에서 최종적으로 springboot app을 실행한 것.

- kill명령어로 springboot app이 아닌 root shell의 pid를 지정하고 프로세스를 종료해도 세 개의 프로세스가 연쇄적으로 종료되는 것을 확인할 수 있었다.

