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

### img sizing

- 이미지를 적절히 배치하는 과정에서 배치가 예상대로 안되었던 상황을 겪었다.

- block element안에서 img태그를 배치해 디자인 했는데, block element의 사이즈가 예상과 달라서 당황했었다.

- 그 이유는 잘 모르겠지만 [img태그는 기본적으로 replaced elements라는 것도 이유중 하나다.](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element)

- replaced element는 `외부 컨텐츠`를 끌어와 자동으로 크기를 조정하기 때문에 css 스타일과는 독립적으로 의도되지 않은 결과가 나올 수 있는 요소라고 한다.

- 각 브라우저마다 스펙이 다르기 때문에 이 차이점을 잘 파악해야 한다.

- img 태그가 box element size에 영향을 주는 요소는 3가지로 보인다.

  1. font-size

  1. line-height

  1. vertical-align

  1. font-family

- 다른 속성도 있지만, height조정 문제에 대한 속성은 이것이 전부라 생각한다.

- 해당 속성은 inline element에 대한 속성이며, 즉 [img 태그는 inline element로 취급된다](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#styling_with_css).

- `case1: default 상태 - font-size: 16px; line-height:1 vertical-align: baseline`

  - ![example img 1](./readme_img/image1.png)

    - 이미지의 높이는 230px인데 모든 속성이 기본 값일 때`(reset.css)` 어떤 이유인지 몰라도 14px만큼의 여백이 생겼다.

- `case2: vertical-align 조정`

  - vertical-align 속성을 조정해서 inline element의 line기준을 바꿔서 배치함으로 써 여백을 줄일 수 있다.

  - font(img)의 수직 정렬 기준점을 box의가운데로 맞추기 위해 `vertical-align: middle`을 적용한다.

  - ![example img 2](./readme_img/image2.png)

    - vertical-align을 조정해준 경우 높이 값이 의도했던 크기로 잘 맞춰지는 것을 확인할 수 있다.

- `case3: font-size / line-height 조정`

  - font-size, line-height속성을 조정해서 box의 높이를 조정한다.

  - 사실상 두 속성은 `font`에 대해 직접적인 영향을 미치기 때문에 img태그에는 간접적으로 영향을 미친다고 봐야 한다.

  - **font-size: 20px \* line-height: 11.5 = 230px**

  - ![example img 3](./readme_img/image3.png)

    - 예상과는 달리 339px로 측정 된다.

    - 이는 img의 vertical-align속성이 baseline(default)값이기 때문에 보정이 발생한 것 같다.

    - baseline에 맞추어 이미지를 맞추려 하니 밑으로의 보정이 생긴 것 같다.

  - 이러한효과는 span tag에서도 볼 수 있었다.

  - **font-size: 100px \* line-height: 5 + vertical-align: middle**

  - ![example img 4](./readme_img/image4.png)

    - span 태그는 vertical-align: baseline인 경우 의도했던 높이가 측정이 되었지만, middle로 준 경우 약간의 오차가 발생했다. 이 또한 기존보다 글자를 밑으로 정렬하려 해서 약간의 보정이 발생한 것 같다.

    - mdn 문서에는 replaced elements에서 span태그가 없는데, 이 또한 img태그와 같은 원리 또는 `font 자체 문제`라고 생각한다.

  - **font-size: 50px \* line-height: 2.3 = 230px**

  - ![example img 5](./readme_img/image5.png)

    - vertical-align: center로 조정을 했지만 약간의 오차가 발생했다.

    - 여기서 두 가지 예측을 할 수 있었다.

      1. 이미지의 사이즈가 정확하게 230px이 아니기 때문에 소수점 크기 계산의 한계. 개발자 도구로 크기를 측정했을 때 정수 값을 보여주고, 소수점이면 소수라고 보여지기 때문에 해당 가능성은 매우 작다.

      1.  line-height값이 소수점이기 때문에 높이 연산의 한계 - 이 부분은 img 대신 기본 span으로 실험했을 때 정확히 box의 높이가 230px이 나와서 아닌것으로 판단.

    - 결과적으로 img가 replaced element라서 의도한 값이 나오지 않는다고 판단.

  - 해결책은 line-height 또는 font-size크기를 0으로 지정하는 것이다. 애매하게 낮은값으로 설정하면 약간의 오차가 발생한다.

- `case3: font-family`

  - 각 font마다 모양이 다르기 때문에 어떤 문자는 기준점 밑을 초과하기 때문에, 최대 여백을 설정하는 것 일 수도 있다.

  - ![example img 6](./readme_img/image6.png) ![example img 7](./readme_img/image7.png)

  - font만 바꿔줬을 뿐인데 높이가 변하는 것을 보아 의도치 않은 하단 여백의 주인공은 `font-family`에 의한 가능성이 매우 높다.

**Conclusion**

- 의도치 않았던 여백은 요소가 `inline element`라는 것에서 기반.

- inline은 text를 위한 요소이므로 font-family의 스타일에 영향을 받는다.

- 그리고 수직 정렬 라인을 정하는 vertical-align에 영향을 받는다.

- `확실하게 하려면 img를 flex box로 감싸거나 display: block으로 지정해줌으로써 문제를 해결할 수 있다.`