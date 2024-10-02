# Fastcampus - Starbucks clone Project

## Overview

- fastcampus 강의에서 진행하는 스타벅스 웹 사이트 클론코딩 프로젝트를 수행했다.

- 먼저 만들어보고 강의에서 제시하는 구현 방법과 나의 구현 방법을 비교하고, 새로 배우고 개선한 점을 기록한다.

### head - meta tag

- social media에서 정보를 공유할 때 간략한 정보를 미리 보여주기 위해 meta태그를 배치한다.

- meta tag는 검색앤진, 크롤러가 사이트 정보를 빠르게 해석하기 위해 head태그에서도 가능한 상단에 배치하는 것이 유리하다고 한다.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Starbucks Project</title>

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Starbucks" />
  <meta property="og:title" content="Starbucks Coffee Korea" />
  <meta
    property="og:description"
    content="스타벅스는 세계에서 가장 큰 커피숍이다."
  />
  <meta property="og:image" content="./images/starbucks_seo.jpg" />
  <meta property="og:url" content="http://localhost:8080" />

  <meta property="twitter:card" content="summary" />
  <meta property="twitter:stie" content="Starbucks" />
  <meta property="twitter:title" content="Starbucks Coffee Korea" />
  <meta
    property="twitter:description"
    content="스타벅스는 세계에서 가장 큰 커피숍이다."
  />
  <meta property="twitter:image" content="./images/starbucks_seo.jpg" />
  <meta property="twitter:url" content="http://localhost:8080" />
</head>

<!-- ... -->
```

- 카카오톡을 위한 `Open Graph Protocol`과 트위터를 위한 `Tweet Card` meta tag를 사용한다.

- 각 Protocol은 항상 카카오톡, 트위터에서만 사용되는 것 뿐만이 아닌, 다양한 소셜미디어에서 공통적으로 사용된다고 한다.

### CSS - nth-of-child / nth-of-type

- CSS에서 n번째 자식 요소를 선택하기 위해 :nth-of-child, :last-child 같은 `child selector`를 사용했는데 적용되지 않은 상황을 겪었다.

```css
.content > .item:nth-child(2) {
  /* ... */
}
```

- 이 경우 content의 자식요소중 2번째 요소가 item이 아니면 스타일은 적용되지 않는다.

- 알아보니 child selector는 해당 자식요소의 위치가 선택자의 태그 유형이 일치해야만 적용된다는 것을 알았다.

- 그래서 :nth-child 대신 :nth-of-type을 사용했다.

```css
.pick-your-favorite > .content > img:first-of-type {
  transition-delay: 0.3s;
}
.pick-your-favorite > .content > img:nth-of-type(2) {
  transition-delay: 0.6s;
}
```

- 자식 요소가 여러 유형의 태그로 섞여있을 때 지정된 유형의 요소들 중 순서를 기준으로 스타일을 지정할 수 있다.