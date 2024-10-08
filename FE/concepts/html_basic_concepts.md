### DTD - Document Type Definition

- html 첫 번째에 항상 있던 `!DOCTYPE html`은 HTML의 `버전 5`를 기준으로 작성된 문서라는 의미다.

- 따라서 브라우저는 해당 문서를 HTML5에 맞게 해석해야 한다.

- 우리가 알 수 있는 주요 특징은 semantic tag와 empty tag의 자유로운 문법이다.

  - XHTML에서는 `img`와 같은 empty tag에 대해서는 반드시 닫는 기호를 사용해야 했는데, HTML5에서는 필수가 아니라고 한다.

- html 1 ~ 4 까지는 html문서 안에 어떤 명시를 하지 않고, 4와 5 사이에 나온 `XHTML`은 명시 방법이 따로 있다고 한다.

<hr />

### html - lang

- `lang` attribute는 html문서가 어떤 언어를 기준으로 쓰여있는지 명시한다.

- `lang="en"`으로 했을 때 크롬 브라우저를 열면 상단에 번역 알림이 떴지만, `lang="ko"`로 하면 번역 알림이 뜨지 않았다.

- 브라우저 내부 메커니즘에 의해 결정되나보다.

<hr />

### favicon - favorite icom

- `1999년 IE`에서 `즐겨찾기(favorite)기능`을 도입하면서 즐겨찾기 목록에 대한 아이콘을 표시하기 위해 favicon을 사용했다고 함.

- favicon을 사용함으로써 웹 사이트를 구별하기 쉬워졌다함.

- 현재는 favicon이 브라우저 탭 등에서도 사용되면서 용도가 정착되었다 함.

### min - minified

- 개발을 하다보면 sample.`min`.js 처럼 `min`이 붙은 파일을 자주 보았었다.

- min은 `minified`의 축약이며 `최소화 되었다`는 뜻을 내포한다.

- 주로 `경량화(lightweighting)`를 목적으로 한다

  - `파일 크기를 줄임`, 따라서 `네트워크 전송 최적화`.

- 부수적으로 `난독화(obfuscation)`를 가져올 수 있는데, 결국 min파일은 불러와서 임의로 수정을하지 않기 때문에 상관쓸 필요가 없다.

<hr />

### abbreviation - special symbol

- `href - hypertext reference`

- `img--alt - alternate`

- `self-closing tag / empty element -> <input />`
