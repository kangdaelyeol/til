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