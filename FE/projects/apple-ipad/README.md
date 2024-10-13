# Fastcampus - Apple ipad app Project

### Overview

- fastcampus 강의에서 진행하는 애플 아이패드 웹 사이트 클론코딩 프로젝트를 수행했다.

- 먼저 만들어보고 강의에서 제시하는 구현 방법과 나의 구현 방법을 비교하고, 새로 배우고 개선한 점을 기록한다.

## word-break: keep-all

- width 제한이 있는 container에 text를 입력할 때 줄 바꿈이 단어별로 발생시키기 위해 [word-break: keep-all](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break#keep-all)옵션을 사용한다.

- 기본 옵션은 `word-break: normal`인데, 이는 영어 텍스트를 입력할 때 단어를 기준으로, 즉 띄어쓰기 기준으로 줄 바꿈이 잘 발생하지만, 한국어는 단어를 구분하지 못해 띄어쓰기 기준으로 줄 바꿈이 발생하지 않고, 문자마다 줄 바꿈이 발생한다.

- keep-all 속성값은 `CJK(Chinese/Japanese/Korean) text`를 위한 속성이라고 한다. 알파벳 순으로 나열해서 우리나라가 마지막에 온 것이라고 하더라 **(중국, 일본이 우월하다는 것이 아님.)**
